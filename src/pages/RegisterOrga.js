import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/LOGO HUB 1.png';
import '../styles/registerOrga.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const RegisterOrga = () => {
  const [nombre, setName] = useState('');
  const [last_name, setLastName] = useState(''); // Nuevo estado para el apellido
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [telefono, setPhone] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nombre,
      last_name, // Agregando apellido al objeto newUser
      email,
      contrasena,
      telefono,
      rol_id: '3', // ID de organizador
      membresia_id: '1', // ID de básico
      activo: 1 // Asignar el estado 'Activo' por defecto
    };

    try {
      await axios.post(`${API_URL}/register`, newUser);
      setNotification({ message: 'Registro exitoso. Puedes iniciar sesión ahora.', type: 'success' });
      setTimeout(() => navigate('/login-orga'), 1000);
    } catch (error) {
      setNotification({ message: 'Error al registrar. Intenta de nuevo.', type: 'error' });
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
    <div className="registro-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="registro-content">
        <div className="registro-logo-container">
          <img src={logo} alt="Logo" className="registro-logo" />
        </div>
        <div className="registro-form-container">
          <form onSubmit={handleSubmit} className="registro-form">
            <h2>Registro</h2>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={nombre}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <label htmlFor="last_name">Apellido:</label> {/* Nuevo campo para apellido */}
            <input
              type="text"
              id="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="phone">Teléfono:</label>
            <input
              type="text"
              id="phone"
              value={telefono}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
          <div className="text-center mt-2">
            <Link to="/login-orga" className="login-link">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrga;
