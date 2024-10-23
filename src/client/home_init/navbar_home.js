// ClientNavbarHome.jsx
import React, { useState } from 'react';
import logo from '../../img/LOGO HUB BLANCO 3.png';
import '../../styles/navbars.css';

const ClientNavbarHome = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar la apertura del menú

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar el estado del menú
  };

  return (
    <header id="header" className={menuOpen ? 'open' : ''}>
      <div className='container4'>
        <div id="logo4" className="pull-left">
          <a href="#" className="scrollto4"><img src={logo} alt="" title="" /></a>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <i className="fa fa-bars"></i> {/* Icono de hamburguesa */}
        </button>

        {/* Botón de cierre "X" */}
        {menuOpen && (
          <button className="close-button" onClick={toggleMenu}>
            <i className="fa fa-times"></i> {/* Icono de cierre */}
          </button>
        )}

        <nav id="nav-menu-container">
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {/* Mostrar los enlaces según si el usuario está autenticado o no */}
            {user ? (
              <>
                <li>
                  <a href="#">
                    <strong>Bienvenido, {user.nombre}</strong>
                  </a>
                </li>
                <li className="buy-tickets">
                  <a href="/cliente/historypay">Historial de Compra</a>
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
      </div>
    </header>
  );
};

export default ClientNavbarHome;
