import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api-auth";
import "../styles/login.css"; 
import logo from '../img/logo3.png';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !contrasena) {
      Swal.fire('Hay un problema', 'Ingrese sus credenciales.', 'warning');
      return;
    }
    try {
      const { token } = await loginUser(email, contrasena);
      const decoteToken = jwtDecode(token);
      const rol_id = decoteToken.rol;
      console.log("tu rol es:", rol_id)

      if (rol_id !== 2) {
        Swal.fire('Hay un problema', 'Tu rol no coincide con el rol seleccionado.', 'warning');
        navigate("/login");
        console.log("no se cumple")
        return;
      }
      else if(rol_id == 2){
        navigate("/cliente/home");
        console.log("cumplido")
      }

      localStorage.setItem("token", token);

    } catch (error) {
      Swal.fire('Error', 'Error al iniciar sesion.', 'error');
      console.error("Error al iniciar sesión", error);
    }
  };

  const resetForm = () => {
    setEmail("");
    setContrasena("");
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    resetForm(); // Limpiar el formulario cuando se cambia el rol
  };

  return (
    <div className="login-container">
      <div className="left-section">
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
          <button onClick={() => navigate("/login-orga")}>Organizador</button>
          <p className="login-register">¿No tienes cuenta? <a className="boton" href="/registro">¡Regístrate!</a></p>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
