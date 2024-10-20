import React, { useState } from 'react';
import logo from '../../img/LOGO HUB BLANCO 3.png';
import '../../styles/navbars.css';

const ClientNavbarHome = ({ user, onLogout }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <header id="header">
      <div className='container4'>
        <div id="logo4" className="pull-left">
          <a href="#" className="scrollto4"><img src={logo} alt="logo" title="" /></a>
        </div>
        <nav id="nav-menu-container" className={mobileNavOpen ? 'mobile-active' : ''}>
          <ul className="nav-menu">
            {/* Mostrar los enlaces según si el usuario está autenticado o no */}
            {user ? (
              <>
                <li>
                  <a href="#profile">
                    <strong>Bienvenido, {user.nombre}</strong>
                  </a>
                </li>
                <li className="buy-tickets mobile-logout">
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
        <button id="mobile-nav-toggle" onClick={toggleMobileNav}>
          <i className={mobileNavOpen ? 'fa fa-times' : 'fa fa-bars'}></i>
        </button>
        <div id="mobile-body-overly" className={mobileNavOpen ? 'active' : ''}></div>
      </div>
    </header>
  );
};

export default ClientNavbarHome;
