import { useRef, useState } from "react";
import api from "../../services/api";

const UploadStudents = ({ onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/students/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      e.target.value = "";
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to upload Excel file."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-5 py-2 rounded-lg font-semibold text-white"
      >
        {loading ? "Uploading..." : "Upload Excel"}
      </button>
    </>
  );
};

export default UploadStudents;