// Login.js (using react-hook-form)
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { handleSubmit, register } = useForm();

  const handleLogin = async (formData) => {
    try {
      // Make a POST request to your login API endpoint using axios
      const response = await axios.post('your-login-api-endpoint', formData);
      // Handle the response (e.g., store tokens in local storage)
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label>Email:</label>
        <input type="text" {...register('email')} />

        <label>Password:</label>
        <input type="password" {...register('password')} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
