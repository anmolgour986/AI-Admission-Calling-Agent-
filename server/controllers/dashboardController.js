const Student = require("../models/Student");
const CallHistory = require("../models/CallHistory");

const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();

    // Start of today in server-local time
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Last 7 calendar days, including today
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    // Upcoming follow-ups: today through the next 13 days
    const followUpEnd = new Date(today);
    followUpEnd.setDate(followUpEnd.getDate() + 14);

    // Last 6 calendar months, including the current month
    const sixMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1
    );

    const [
      totalStudents,
      interested,
      callback,
      noAnswer,
      notInterested,
      admissionConfirmed,
      recentStudents,
      callsByDay,
      interestDistribution,
      callOutcomes,
      leadsByCourse,
      followUpsByDay,
      admissionsByMonth,
      overdueFollowUps,
      followUpsDueToday,
    ] = await Promise.all([
      // Existing summary statistics
      Student.countDocuments(),

      Student.countDocuments({
        status: "Interested",
      }),

      Student.countDocuments({
        status: "Callback",
      }),

      Student.countDocuments({
        status: "No Answer",
      }),

      Student.countDocuments({
        status: "Not Interested",
      }),

      Student.countDocuments({
        status: "Admission Confirmed",
      }),

      Student.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      // 1. Calls made each day
      CallHistory.aggregate([
        {
          $match: {
            callDate: {
              $gte: sevenDaysAgo,
              $lt: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1
              ),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$callDate",
              },
            },
            calls: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // 2. Student interest distribution
      Student.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // 3. Call outcomes
      CallHistory.aggregate([
        {
          $group: {
            _id: {
              $ifNull: ["$callOutcome", "Unknown"],
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // 4. Leads by course
      Student.aggregate([
        {
          $group: {
            _id: {
              $ifNull: ["$course", "Unknown"],
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ]),

      // 5. Upcoming follow-ups by day
      Student.aggregate([
        {
          $match: {
            followUpDate: {
              $gte: today,
              $lt: followUpEnd,
            },
            status: {
              $nin: [
                "Admission Confirmed",
                "Not Interested",
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$followUpDate",
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // 6. Confirmed admissions by month
      Student.aggregate([
        {
          $match: {
            status: "Admission Confirmed",
            admissionConfirmedAt: {
              $gte: sixMonthsAgo,
              $lte: now,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$admissionConfirmedAt",
              },
            },
            admissions: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // Additional summary card
      Student.countDocuments({
        followUpDate: {
          $lt: now,
          $ne: null,
        },
        status: {
          $nin: [
            "Admission Confirmed",
            "Not Interested",
          ],
        },
      }),

      Student.countDocuments({
        followUpDate: {
          $gte: today,
          $lt: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          ),
        },
        status: {
          $nin: [
            "Admission Confirmed",
            "Not Interested",
          ],
        },
      }),
    ]);

    // Fill missing calendar days with zero calls.
    const callsMadeEachDay = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);

      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const existing = callsByDay.find(
        (item) => item._id === dateKey
      );

      callsMadeEachDay.push({
        date: dateKey,
        calls: existing ? existing.calls : 0,
      });
    }

    // Fill missing follow-up days with zero.
    const followUpsDueOverTime = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const existing = followUpsByDay.find(
        (item) => item._id === dateKey
      );

      followUpsDueOverTime.push({
        date: dateKey,
        count: existing ? existing.count : 0,
      });
    }

    // Fill missing months with zero admissions.
    const admissionConversionsByMonth = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - 5 + i,
        1
      );

      const monthKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
      ].join("-");

      const existing = admissionsByMonth.find(
        (item) => item._id === monthKey
      );

      admissionConversionsByMonth.push({
        month: monthKey,
        admissions: existing ? existing.admissions : 0,
      });
    }

    // Keep the existing dashboard response fields.
    res.status(200).json({
      success: true,

      data: {
        totalStudents,
        interested,
        callback,
        noAnswer,
        notInterested,
        admissionConfirmed,
        recentStudents,

        // New summary card data
        overdueFollowUps,
        followUpsDueToday,

        // Chart datasets
        charts: {
          callsMadeEachDay,

          interestDistribution: interestDistribution.map(
            (item) => ({
              status: item._id || "Unknown",
              count: item.count,
            })
          ),

          callOutcomes: callOutcomes.map((item) => ({
            outcome: item._id || "Unknown",
            count: item.count,
          })),

          leadsByCourse: leadsByCourse.map((item) => ({
            course: item._id || "Unknown",
            count: item.count,
          })),

          followUpsDueOverTime,

          admissionConversionsByMonth,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard analytics",
    });
  }
};

module.exports = {
  getDashboardStats,
};