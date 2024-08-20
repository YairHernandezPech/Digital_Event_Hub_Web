import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/LOGO HUB 1.png';
import '../styles/loginOrga.css';

const LoginOrga = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://digital-event.onrender.com/api/login', { email, contrasena });
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

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={handleBackClick}>
        Volver
      </button>
      <div className="login-content">
        <div className="login-form-container">
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <h2 className="login-title">¡Bienvenido!</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>
          <div className="login-divider"></div>
          <div className="login-social-buttons">
            <button className="login-social-button"><i className="fab fa-facebook-f"></i></button>
            <button className="login-social-button"><i className="fab fa-google"></i></button>
            <button className="login-social-button"><i className="fab fa-twitter"></i></button>
          </div>
          <p className="login-register">¿No tienes cuenta? <Link to="/register-orga">¡Regístrate!</Link></p>
        </div>
        <div className="login-logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginOrga;
