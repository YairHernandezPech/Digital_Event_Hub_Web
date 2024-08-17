import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from './imagenes/logo-2.png';

const NavbarHomeEvent = () => {
  return (
    
    <header>
    <div className="logo-container">
      <img src={logo} alt="Logo" width="145" height="145" />
      <h1 >Eventos</h1>
    </div>
    <nav>
      <ul>
        <li><a className="link" href="/">Inicio</a></li>
        <li><a className="link" href="/quienes-somos">Quienes Somos</a></li>
        <li><a className="link" href="/servicios">Servicios</a></li>
        <li><a className="link" href="/contacto">Contacto</a></li>
        <li><a className="link" href="/cliente">Eventos</a></li>
        <li><a href="login" className="login-button">Iniciar sesión</a></li>
        <li><a href="registro" className="login-button">Registrarse</a></li>
      </ul>
    </nav>
  </header>
  );
};

export default NavbarHomeEvent;
