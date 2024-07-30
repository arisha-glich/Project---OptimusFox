import { useState } from 'react';

const useSignupForm = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!values.fullName) newErrors.fullName = 'Full Name is required';
    if (!values.email) newErrors.email = 'Email is required';
    if (!values.password) newErrors.password = 'Password is required';
    if (values.password !== values.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!values.phone) newErrors.phone = 'Phone Number is required';
    if (!values.dob) newErrors.dob = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};

export default useSignupForm;
