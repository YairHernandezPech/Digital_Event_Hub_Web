import React, { useState } from "react";
import { registerUser } from "../services/api-auth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api-auth";
import Swal from 'sweetalert2';
import "../styles/register.css";
import logo from '../img/LOGO HUB 1.png';

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
    const rol_id = 2; // Asignar rol_id para cliente

    // Validación de campos
    if (!nombre || !email || !contrasena || !telefono || !last_name) {
      Swal.fire('Hay un problema', 'Por favor rellena todos los campos.', 'warning');
      return;
    }

    console.log("Datos a enviar:", { nombre, email, contrasena, telefono, last_name, rol_id });

    try {
      // Enviar los datos al endpoint de registro
      await registerUser({ 
        nombre, 
        email, 
        last_name, 
        contrasena, 
        telefono, 
        rol_id 
      });

      // Autologin
      const { token } = await loginUser(email, contrasena);
      localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));

      // Navegar al home del cliente
      navigate("/cliente/home");

      Swal.fire('Éxito', 'Registro exitoso, iniciando sesión.', 'success');
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
            <p className="login-register">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;