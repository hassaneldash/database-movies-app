// Register.js (using react-hook-form)
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { handleSubmit, register } = useForm();

  const handleRegister = async (formData) => {
    try {
      // Make a POST request to your Register API endpoint using axios
      const response = await axios.post('your-Register-api-endpoint', formData);
      // Handle the response (e.g., store tokens in local storage)
    } catch (error) {
      // Handle Register error
      console.error('Register error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <label>Email:</label>
        <input type="text" {...register('email')} />

        <label>Password:</label>
        <input type="password" {...register('password')} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
