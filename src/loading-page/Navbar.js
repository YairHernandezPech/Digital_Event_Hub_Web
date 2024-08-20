import React from 'react';
import logo from './img/LOGO HUB BLANCO 3.png';
import './navbar.css'

const Header = () => {
    return (
<header id="header">

      <nav id="nav-menu-container">
        
        <ul class="nav-menu">
          
          <li class="menu-active"><a href="#intro">Inicio</a></li>
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#speakers">Eventos</a></li>
          <li><a href="#venue">Galeria</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li class="buy-tickets"><a href="#Membresias"><i class="fa-solid fa-ticket fa-shake"></i> Membresias</a></li>
          <li class="buy-tickets"><a href="/registro">Registarte  <i class="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
          <li class="buy-tickets"><a href="/login">Iniciar  <i class="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
        </ul>
      </nav>
  </header>
    );
};

export default Header;
