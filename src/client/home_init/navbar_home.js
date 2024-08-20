// ClientNavbarHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const ClientNavbarHome = ({ user, onLogout }) => {
  return (
    <header id="header">
      <nav id="nav-menu-container">
        <ul className="nav-menu">
          
          {/* Mostrar los enlaces según si el usuario está autenticado o no */}
          {user ? (
            <>
                          <li>
                <a href="#profile">
                  <strong>Bienvenido, {user.nombre}</strong>
                </a>
              </li>
              <li className="buy-tickets">
                <a href="#" onClick={onLogout}>Cerrar Sesión</a>
              </li>

            </>
          ) : (
            <>
              <li className="buy-tickets"><a href="/registro">Regístrate <i className="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
              <li className="buy-tickets"><a href="/login">Iniciar Sesión <i className="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default ClientNavbarHome;
