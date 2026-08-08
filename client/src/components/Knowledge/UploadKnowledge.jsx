import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
} from "react-icons/fa";
import api from "../../services/api";

function UploadKnowledge({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);

    try {
      setLoading(true);

      await api.post("/knowledge/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Knowledge uploaded successfully.");

      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition duration-300 ${
          isDragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-700 hover:border-cyan-500 hover:bg-slate-800"
        }`}
      >
        <input {...getInputProps()} />

        <FaCloudUploadAlt
          size={60}
          className="mx-auto text-cyan-400 mb-4"
        />

        <h2 className="text-2xl font-semibold text-white">
          Drag & Drop Files Here
        </h2>

        <p className="text-slate-400 mt-2">
          PDF • DOC • DOCX • TXT
        </p>

        <button
          type="button"
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white font-semibold"
        >
          Browse Files
        </button>
      </div>

      {file && (
        <div className="mt-6 bg-slate-800 rounded-xl p-4 flex justify-between items-center">

          <div className="flex items-center gap-4">

            {file.name.endsWith(".pdf") ? (
              <FaFilePdf className="text-red-500 text-3xl" />
            ) : file.name.endsWith(".doc") ||
              file.name.endsWith(".docx") ? (
              <FaFileWord className="text-blue-500 text-3xl" />
            ) : (
              <FaFileAlt className="text-yellow-400 text-3xl" />
            )}

            <div>
              <h3 className="text-white font-semibold">
                {file.name}
              </h3>

              <p className="text-slate-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white font-semibold"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>
      )}
    </div>
  );
}

export default UploadKnowledge;