import React, { useState } from "react";
import { registerUser } from  "../services/api-auth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api-auth";
import Swal from 'sweetalert2';
import "../styles/register.css"
import logo from '../img/LOGO HUB 1.png'


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: "",
    last_name: "",
  });

  const [isOrganizer, setIsOrganizer] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, contrasena, telefono, last_name } = formData;
    const rol_id = 2;

     // Validación de campos según el rol
     if (!nombre || !email || !contrasena || !telefono || !last_name ) {
      // alert("Por favor rellena todos los campos");
      Swal.fire('Hay un problema', 'Por favor rellena todos los campos.', 'warning');
      return;
    }

    console.log("Datos a enviar:", { nombre, email, contrasena, telefono, last_name, rol_id});

    try {
      await registerUser({ nombre, email, contrasena, telefono, last_name, rol_id });
      
      //autologin
      const { token, user } = await loginUser(email, contrasena);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      


      switch (user.rol_id) {
        case 2:
          navigate("/cliente/home");
        
          break;
        default:
          navigate("/");
          break;
      }

      Swal.fire('Éxito', 'Registro exitoso , iniciando sesion.', 'success');
    } catch (error) {
      console.error("Error al registrarse", error);

      Swal.fire('Error', 'Hubo un error.', 'error');
    }
  };

  

  return (
    <div className="registro-container">
      <div className="registro-content">
        <div className="registro-logo-container">
          <img src={logo} alt="Logo" className="registro-logo" />
        </div>
        <div className="registro-form-container">
        <div className="button-container1">
          <button onClick={() => setIsOrganizer(false)} className={`switch-button1 ${!isOrganizer ? 'active' : ''}`}>
            Cliente
          </button>
          <button className="switch-button1" onClick={() => navigate("/register-orga")}>
            Organizador
          </button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row horizontal">
              <div className="form-group">
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group">
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="form-row horizontal">
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                />
              </div>
              <div className="form-group">
                <input
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="contraseña"
                />
              </div>
            </div>
            <div className="form-row horizontal">
              <div className="form-group">
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Registrar</button>
            </div>
            <p className="login-register">¿Ya tienes cuenta? <a href="/login">Inicia sesion</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
