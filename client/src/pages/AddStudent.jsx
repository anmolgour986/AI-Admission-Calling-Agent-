import { useParams } from "react-router-dom";
import StudentForm from "../components/students/StudentForm";

const AddStudent = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">
        {id ? "Edit Student" : "Add Student"}
      </h1>

      <StudentForm />
    </div>
  );
};

export default AddStudent;