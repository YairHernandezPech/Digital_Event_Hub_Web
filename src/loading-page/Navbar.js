import React from 'react';
import logo from '../img/LOGO HUB BLANCO 3.png';
import '../styles/navbars.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
<header id="header">
      <div className='container4'>
        <div id="logo4" className="pull-left">
          <a href="/landing-page/home.html" className="scrollto4">
            <img src={logo} alt="" title="" />
          </a>
        </div>

        <nav id="nav-menu-container">
          <ul className="nav-menu">
            <li className="menu-active">
              <a href="/landing-page/home.html#home">Inicio</a>
            </li>
            <li>
              <a href="/landing-page/home.html#about">Acerca de</a>
            </li>
            <li>
              <a href="/landing-page/home.html#speakers">Eventos</a>
            </li>
            <li>
              <a href="/landing-page/home.html#venue">Galería</a>
            </li>
            <li>
              <a href="/landing-page/home.html#contact">Contacto</a>
            </li>
            <li className="buy-tickets">
              <a href="/landing-page/home.html#Membresias">
                <i className="fa-solid fa-ticket fa-shake"></i> Membresías
              </a>
            </li>
            <li className="buy-tickets">
              <Link to="/registro">
                Regístrate <i className="fa-solid fa-right-to-bracket fa-bounce"></i>
              </Link>
            </li>
            <li className="buy-tickets">
              <Link to="/login">
                Iniciar <i className="fa-solid fa-right-to-bracket fa-bounce"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    );
};

export default Header;
