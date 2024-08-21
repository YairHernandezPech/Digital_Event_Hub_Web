import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api-auth";
import "../styles/login.css";
import logo from '../img/LOGO HUB 1.png'
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if email and password are filled
    if (!email || !contrasena) {
      Swal.fire('Hay un problema', 'Ingrese sus credenciales.', 'warning');
      return;
    }
    try {
      const { token, user } = await loginUser(email, contrasena);

      if (
        (role === "user" && user.rol_id !== 2)
      ) {
        Swal.fire('Hay un problema', 'Tu rol no coincide con el rol seleccionado.', 'warning');
        navigate("/login");
        return; // Detiene la ejecución del código si el rol no coincide
      }

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
    } catch (error) {
      Swal.fire('Error', 'Error al intentar iniciar sesion.', 'error');
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
      <div className="login-content">
        <div className="login-form-container">
          <h2 className="login-title">¡Bienvenido!</h2>
          <div className="login-role-selector">
            <button
              className={`role-button ${role === "user" ? "active" : ""}`}
              onClick={() => handleRoleChange("user")}
            >
              Usuario
            </button>
            <button
              className="role-button-dos"
              onClick={() => navigate("/login-orga")}
            >
              Organizador
            </button>
          </div>
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
          <p className="login-register">¿No tienes cuenta? <a href="/registro">¡Regístrate!</a></p>
          <p className="login-register">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/reset">Recupérala aquí</a>
          </p>
        </div>
        <div className="login-logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;