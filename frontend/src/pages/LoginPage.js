import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      toast.success('¡Autenticación exitosa!');
      navigate('/', { replace: true });
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>

    </div>
    
  );
}
