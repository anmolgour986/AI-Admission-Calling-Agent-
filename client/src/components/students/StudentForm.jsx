import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateStudent } from "../../utils/validation";
import api from "../../services/api";

const StudentForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
    status: "Interested",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateStudent(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await api.post("/students", formData);

      alert(res.data.message);

      setFormData({
        name: "",
        course: "",
        phone: "",
        email: "",
        status: "Interested",
        notes: "",
      });

      navigate("/students");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save student."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      course: "",
      phone: "",
      email: "",
      status: "Interested",
      notes: "",
    });

    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-slate-300 mb-2">
            Student Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Course
          </label>

          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="BCA / B.Tech / MBA"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          {errors.course && (
            <p className="text-red-500 text-sm mt-1">
              {errors.course}
            </p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@email.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
        >
          <option value="Interested">Interested</option>
          <option value="Callback">Callback</option>
          <option value="No Answer">No Answer</option>
          <option value="Not Interested">Not Interested</option>
        </select>
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Notes
        </label>

        <textarea
          rows="4"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Write notes..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 text-white font-semibold"
        >
          {loading ? "Saving..." : "Save Student"}
        </button>

      </div>
    </form>
  );
};

export default StudentForm;