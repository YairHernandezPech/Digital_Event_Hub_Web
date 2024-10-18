import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo3.png';
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
      <div className="left-section">
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <img src={logo} alt="Logo" className="Logo" />
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
          <p className="login-register1">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/reset">Recupérala aquí</a>
          </p>
        </div>
        <div className="right-section">
        <div className="login-container-2">
          <h2>¡Bienvenido!</h2>
          <p>Por favor, ingresa tus datos para poder iniciar sesión en Digital Event Hub y ver nuestros eventos.</p>
          <br />
          <button onClick={() => navigate("/login")}>Cliente</button>
          <p className="login-register">¿No tienes cuenta? <Link to="/register-orga">¡Regístrate!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginOrga;
