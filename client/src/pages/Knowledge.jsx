import { useEffect, useState } from "react";
import api from "../services/api";
import UploadKnowledge from "../components/Knowledge/UploadKnowledge";

function Knowledge() {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this file?"
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
          "Delete failed."
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold text-white">
          Knowledge Base
        </h1>

        <UploadKnowledge
          onUploadSuccess={fetchKnowledge}
        />

      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4 text-slate-300">
                Title
              </th>

              <th className="text-left p-4 text-slate-300">
                Type
              </th>

              <th className="text-left p-4 text-slate-300">
                Size
              </th>

              <th className="text-left p-4 text-slate-300">
                Uploaded
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
                  className="text-center py-8 text-slate-400"
                >
                  Loading...
                </td>

              </tr>

            ) : files.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-slate-400"
                >
                  No Knowledge Files Uploaded
                </td>

              </tr>

            ) : (

              files.map((file) => (

                <tr
                  key={file._id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4 text-white">
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

export default Knowledge;