import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/registerOrga.css';
import logo from '../img/logo3.png';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const RegisterOrga= () => {
  const [formData, setFormData] = useState({
    nombre: "",
    last_name: "",
    email: "",
    contrasena: "",
    telefono: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
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
      <div className="organizer-info-container">
          <h2>¿Eres Usuario?</h2>
          <p>¡Haz clic para registrarte como Usuario <br/> y poder Visualizar nuestros eventos!<br/></p>
          <button onClick={() => navigate("/registro")} className="switch-button">Regístrate como Usuario</button>
        </div>
        <div className="registro-form-container">
          <form onSubmit={handleSubmit} className="registro-form">
          <div className="logo-container">
             <img src={logo} alt="Logo" className="logo" />
             <h3 className="Organizadorr">Organizador</h3>
             <hr></hr>
            </div>
          <div className="form-row horizontal">
            <div className="form-groupp">
            <input
              type="text"
              id="name"
              value={formData.nombre}
              onChange = {handleChange}
              required
              placeholder="Nombre"
            />
            </div>
            <div className="form-groupp">
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder='Apellido'
              required
            />
            </div>
          </div>
          <div className="form-row horizontal">
          <div className="form-groupp">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              required
            />
            </div>
            <div className="form-groupp">
            <input
              name="nombre"
              type="password"
              id="password"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
            </div>
          </div>
          <div className="form-row horizontal">
          <div className="form-groupp">
            <input
              type="text"
              id="phone"
              value={formData.telefono}
              onChange={handleChange}
              placeholder='Telefono'
              required
            />
            </div>
            </div>
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
