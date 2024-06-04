import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/auth/login', {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token); // Lưu token vào localStorage
        console.log('Login successful'); // In ra thông báo thành công vào console
        navigate('/admin'); // Điều hướng đến bảng điều khiển admin sau khi đăng nhập thành công
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
