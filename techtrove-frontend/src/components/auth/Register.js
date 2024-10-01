import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authservice';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ username, email, password, companyName });
      navigate.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;