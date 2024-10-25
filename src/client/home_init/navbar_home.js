import React, { useState } from 'react';
import logo from '../../img/LOGO HUB BLANCO 3.png';
import '../../styles/navbars.css';

const ClientNavbarHome = ({ user, onLogout }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header id="header">
      <div className='container4'>
        <div id="logo4" className="pull-left">
          <a href="/cliente/home" className="scrollto4">
            <img src={logo} alt="Logo" title="" />
          </a>
        </div>

        <nav id="nav-menu-container" className={isMobileNavOpen ? 'active' : ''}>
          <ul className="nav-menu">
            {user ? (
              <>
<<<<<<< Updated upstream
                <li>
                  <a href="/cliente/home">
                    <strong>Bienvenido, {user.nombre}</strong>
                  </a>
                </li>
                <li className="buy-tickets">
                  <a href="/cliente/historypay">Historial de Compra</a>
                </li>
                <li className="buy-tickets">
                  <a href="/landing-page/home.html" onClick={onLogout}>Cerrar Sesión</a>
                </li>

=======
                <li><a href="/cliente/home"><strong>Bienvenido, {user.nombre}</strong></a></li>
                <li className="buy-tickets"><a href="/cliente/historypay">Historial de Compra</a></li>
                <li className="buy-tickets"><a href="#" onClick={onLogout}>Cerrar Sesión</a></li>
>>>>>>> Stashed changes
              </>
            ) : (
              <>
                <li className="buy-tickets"><a href="/registro">Regístrate</a></li>
                <li className="buy-tickets"><a href="/login">Iniciar Sesión</a></li>
              </>
            )}
          </ul>
        </nav>

        {/* Botón de menú de hamburguesa para móviles */}
        <div id="mobile-nav-toggle" onClick={toggleMobileNav}>
          <i className={`fa ${isMobileNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

      </div>

      {/* Fondo oscuro cuando el menú está abierto en móviles */}
      {isMobileNavOpen && <div id="mobile-body-overly" onClick={toggleMobileNav}></div>}
    </header>
  );
};

export default ClientNavbarHome;
