import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../img/LOGO HUB 1.png';
import '../styles/login.css';

const LoginAdmin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-digital.fly.dev/api/users/login', { email, contrasena });
      const { token } = response.data;
      onLogin(token); // Asegúrate de que `onLogin` maneje el token y configure el rol correspondiente
      setNotification({ message: 'Datos correctos', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Datos incorrectos', type: 'error' });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <h2 className="login-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">Acceder</button>
          </form>
        </div>
        <div className="login-logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
