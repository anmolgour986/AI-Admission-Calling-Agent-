import { useEffect, useState } from "react";
import api from "../services/api";
import UploadKnowledge from "../components/knowledge/UploadKnowledge";

function KnowledgeBase() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      setLoading(true);

      const res = await api.get("/knowledge");

      setFiles(res.data.data);
    } catch (error) {
      console.error("Error fetching knowledge:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/knowledge/${id}`);

      alert("Knowledge deleted successfully.");

      fetchKnowledge();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete file."
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Knowledge Base
          </h1>

          <p className="text-slate-400 mt-2">
            Upload PDFs, DOCX or TXT files that will be used by the AI during admission calls.
          </p>
        </div>

        <UploadKnowledge
          onUploadSuccess={fetchKnowledge}
        />

      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4 text-slate-300">
                Title
              </th>

              <th className="text-left p-4 text-slate-300">
                File Type
              </th>

              <th className="text-left p-4 text-slate-300">
                Size
              </th>

              <th className="text-left p-4 text-slate-300">
                Uploaded On
              </th>

              <th className="text-left p-4 text-slate-300">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-slate-400"
                >
                  Loading Knowledge Files...
                </td>

              </tr>

            ) : files.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-12 text-slate-500"
                >
                  No knowledge files uploaded yet.
                </td>

              </tr>

            ) : (

              files.map((file) => (

                <tr
                  key={file._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white font-medium">
                    {file.title}
                  </td>

                  <td className="p-4 text-slate-300">
                    {file.fileType}
                  </td>

                  <td className="p-4 text-slate-300">
                    {(file.size / 1024).toFixed(2)} KB
                  </td>

                  <td className="p-4 text-slate-300">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => handleDelete(file._id)}
                      className="text-red-500 hover:text-red-400 font-medium"
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

export default KnowledgeBase;