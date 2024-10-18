import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/reset_password.css";
import logo from '../img/logo3.png'; // Importa el logo aquí

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor introduce tu email',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6f42c1', // Color de tu proyecto
      });
      return;
    }
    try {
      const response = await fetch("https://api-digitalevent.onrender.com/api/password/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha enviado un enlace para restablecer tu contraseña.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#6f42c1',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al enviar el correo: ${data.message}`,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#6f42c1',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al enviar el correo',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6f42c1',
      });
      console.error("Error al enviar el correo", error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="left-section">
        <img src={logo} alt="Digital Event Hub Logo" className="logo" /> {/* Muestra el logo sin texto */}
        <div className="reset-password-form">
          <h2>Recuperar contraseña</h2>
          <p>Ingresa tu correo para recuperar tu contraseña y  continuar usando <span>Digital Event Hub.</span></p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-button1">Enviar</button> {/* Botón morado */}
          </form>
          
        </div>
      </div>
      <div className="right-section">
        <div className="welcome-section">
          <h2>¡Iniciar sesión!</h2>
          <p> ¡Te acordaste de tu contraseña inicia sesión !</p>
          <a href="/login" className="submit-button">Iniciar sesión</a> {/* Botón para iniciar sesión */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
