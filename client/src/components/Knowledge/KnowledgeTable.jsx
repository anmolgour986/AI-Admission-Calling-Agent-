import { useEffect, useState } from "react";
import api from "../../services/api";

const KnowledgeTable = ({ refresh }) => {
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledge();
  }, [refresh]);

  const fetchKnowledge = async () => {
    try {
      setLoading(true);

      const res = await api.get("/knowledge");

      setKnowledge(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this knowledge?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/knowledge/${id}`);

      fetchKnowledge();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete knowledge."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-slate-400">
        Loading Knowledge...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-800">
          <tr>
            <th className="text-left p-4 text-slate-300">
              Category
            </th>

            <th className="text-left p-4 text-slate-300">
              Question
            </th>

            <th className="text-left p-4 text-slate-300">
              Answer
            </th>

            <th className="text-left p-4 text-slate-300">
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          {knowledge.length === 0 ? (

            <tr>
              <td
                colSpan="4"
                className="text-center py-8 text-slate-400"
              >
                No Knowledge Found
              </td>
            </tr>

          ) : (

            knowledge.map((item) => (

              <tr
                key={item._id}
                className="border-t border-slate-800"
              >
                <td className="p-4 text-cyan-400">
                  {item.category}
                </td>

                <td className="p-4 text-white">
                  {item.question}
                </td>

                <td className="p-4 text-slate-300">
                  {item.answer}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(item._id)}
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
  );
};

export default KnowledgeTable;