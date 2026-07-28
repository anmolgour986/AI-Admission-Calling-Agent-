export const validateStudent = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Student name is required";
  }

  if (!formData.course.trim()) {
    errors.course = "Course is required";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};