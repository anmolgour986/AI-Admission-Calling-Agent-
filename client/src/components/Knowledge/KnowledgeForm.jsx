import { useState } from "react";
import api from "../../services/api";

const KnowledgeForm = ({ onKnowledgeAdded }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question || !formData.answer) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/knowledge", formData);

      alert(res.data.message);

      setFormData({
        question: "",
        answer: "",
        category: "General",
      });

      if (onKnowledgeAdded) {
        onKnowledgeAdded();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add knowledge."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-semibold text-white">
        Add Knowledge
      </h2>

      <div>
        <label className="block text-slate-300 mb-2">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
        >
          <option>General</option>
          <option>Admission</option>
          <option>Courses</option>
          <option>Fees</option>
          <option>Scholarship</option>
          <option>Hostel</option>
          <option>Placement</option>
        </select>
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Question
        </label>

        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Enter question..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Answer
        </label>

        <textarea
          rows="5"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Enter answer..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save Knowledge"}
        </button>
      </div>
    </form>
  );
};

export default KnowledgeForm;