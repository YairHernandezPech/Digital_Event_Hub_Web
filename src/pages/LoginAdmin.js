import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/LOGO HUB 1.png';
import '../styles/login.css';

const LoginAdmin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState(''); // Cambio de nombre de 'password' a 'contrasena'
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://digital-event.onrender.com/api/login', { email, contrasena }); // Cambio de 'password' a 'contrasena'
      const { token } = response.data;
      onLogin(token);
      setNotification({ message: 'Datos correctos', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Datos incorrectos', type: 'error' });
    }
  };

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
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
            <div className="login-divider"></div>
            <div className="login-social-buttons">
              <button className="login-social-button"><i className="fab fa-facebook-f"></i></button>
              <button className="login-social-button"><i className="fab fa-google"></i></button>
              <button className="login-social-button"><i className="fab fa-twitter"></i></button>
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
