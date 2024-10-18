import React, { useState } from "react";
import { registerUser } from  "../services/api-auth";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../services/api-auth";
import logotipo from '../img/logo3.png';
import Swal from 'sweetalert2';
import "../styles/register.css"


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: "",
    last_name: "",
  });

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
    <div className="registroo-container">
      <div className="registroo-content">
        <div className="registro-formu-container">
          <form onSubmit={handleSubmit} noValidate>
            <div className="logotipo-container">
             <img src={logotipo} alt="Logo" className="logotipo" />
             <h3 className="User">Usuario</h3>
             <hr></hr>
            </div>
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
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="Contraseña"
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
          </form>
          <div className="text-center mt-2">
            <Link to="/login" className="login-link">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </div>
        <div className="usuario-info-container">
          <h2>¿Eres Organizador?</h2>
          <p>¡Haz clic para registrarte como organizador <br/> y poder crear tus eventos!<br/></p>
          <button onClick={() => navigate("/register-orga")} className="switch-button1">Regístrate como Organizador</button>
        </div>
      </div>
    </div>
  );
};

export default Register;