import React, { useState } from "react";
import { registerUser } from  "../services/api-auth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api-auth";
import "./css/register.css";
import logo from './img/logo.png';


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: "",
    last_name: "",
    curp: "",
    empresa: "",
    rfc: "",
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

    const { nombre, email, contrasena, telefono, last_name, curp, empresa, rfc } = formData;
    const rol_id = isOrganizer ? 3 : 2;

     // Validación de campos según el rol
     if (!nombre || !email || !contrasena || !telefono || !last_name || (isOrganizer && (!curp || !empresa || !rfc))) {
      alert("Por favor rellena todos los campos");
      return;
    }

    console.log("Datos a enviar:", { nombre, email, contrasena, telefono, last_name, rol_id, curp, empresa, rfc });

    try {
      await registerUser({ nombre, email, contrasena, telefono, last_name, rol_id });
      
      //autologin
      const { token, user } = await loginUser(email, contrasena);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Guardar los datos adicionales en localStorage si es organizador
      if (rol_id === 3) {
        localStorage.setItem("curp", curp);
        localStorage.setItem("empresa", empresa);
        localStorage.setItem("rfc", rfc);
      }

      switch (user.rol_id) {
        case 2:
          navigate("/cliente/home");
          break;
        case 3:
          navigate("/cliente/home");
          break;
        default:
          navigate("/");
          break;
      }

      alert("Registro exitoso , iniciando sesion");
    } catch (error) {
      console.error("Error al registrarse", error);
      alert("Hubo un error");
    }
  };

  

  return (
    <div className="registro-container">
      <div className="registro-content">
        <div className="registro-logo-container">
          <img src={logo} alt="Logo" className="registro-logo" />
        </div>
        <div className="registro-form-container">
        <div className="button-container">
          <button onClick={() => setIsOrganizer(false)} className={`switch-button ${!isOrganizer ? 'active' : ''}`}>
            Cliente
          </button>
          <button onClick={() => setIsOrganizer(true)} className={`switch-button ${isOrganizer ? 'active' : ''}`}>
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
            {isOrganizer && (
              <>
                <div className="form-group ">
                  <input
                    name="curp"
                    value={formData.curp}
                    onChange={handleChange}
                    placeholder="CURP"
                  />
                </div>
                <div className="form-group ">
                  <input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Empresa"
                  />
                </div>
                <div className="form-group ">
                  <input
                    name="rfc"
                    value={formData.rfc}
                    onChange={handleChange}
                    placeholder="RFC"
                  />
                </div>
              </>
            )}
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
