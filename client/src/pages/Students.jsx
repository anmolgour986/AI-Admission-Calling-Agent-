import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import UploadStudents from "../components/students/UploadStudents";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students");

      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);

      alert("Student deleted successfully.");

      fetchStudents();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete student."
      );
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.course.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search);

    const matchesStatus =
      status === "All" || student.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold text-white">
          Students
        </h1>

        <div className="flex gap-3">

          <UploadStudents
            onUploadSuccess={fetchStudents}
          />

          <Link to="/students/add">
            <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold text-white">
              + Add Student
            </button>
          </Link>

        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white"
        >
          <option>All</option>
          <option>Interested</option>
          <option>Callback</option>
          <option>No Answer</option>
          <option>Not Interested</option>
        </select>

      </div>

      {/* Students Table */}
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-slate-300">Name</th>
              <th className="text-left p-4 text-slate-300">Course</th>
              <th className="text-left p-4 text-slate-300">Phone</th>
              <th className="text-left p-4 text-slate-300">Email</th>
              <th className="text-left p-4 text-slate-300">Status</th>
              <th className="text-left p-4 text-slate-300">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-slate-400"
                >
                  Loading Students...
                </td>
              </tr>

            ) : filteredStudents.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-slate-400"
                >
                  No Students Found
                </td>
              </tr>

            ) : (

              filteredStudents.map((student) => (

                <tr
                  key={student._id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4 text-white">
                    {student.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {student.course}
                  </td>

                  <td className="p-4 text-slate-300">
                    {student.phone}
                  </td>

                  <td className="p-4 text-slate-300">
                    {student.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "Interested"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : student.status === "Callback"
                          ? "bg-green-500/20 text-green-400"
                          : student.status === "No Answer"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <button
                      disabled
                      className="text-slate-500 cursor-not-allowed mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;