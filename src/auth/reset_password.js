import React, { useState } from "react";
import "../styles/reset_password.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor introduce tu email");
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
       alert("Correo enviado");
      } else {
        alert("Error al enviar el correo", data);
      }
    } catch (error) {
      alert("Ocurrio un error");
      console.error("Error al enviar el correo", error);
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="app-title">Digital Event Hub</h1>
      <div className="reset-password-form">
        <h2>Recuperar contraseña</h2>
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
          <button type="submit" className="submit-button">Enviar</button>
        </form>
        <p>
          ¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
