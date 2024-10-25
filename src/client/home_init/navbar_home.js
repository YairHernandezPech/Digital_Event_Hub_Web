// ClientNavbarHome.jsx
import React from 'react';
import logo from '../../img/LOGO HUB BLANCO 3.png';
import '../../styles/navbars.css';

const ClientNavbarHome = ({ user, onLogout }) => {
  return (
    <header id="header">
      <div className='container4'>
        <div id="logo4" class="pull-left">

          <a href="/cliente/home" className="scrollto4"><img src={logo} alt="" title="" /></a>
        </div>
        <nav id="nav-menu-container">
          <ul className="nav-menu">

            {/* Mostrar los enlaces según si el usuario está autenticado o no */}
            {user ? (
              <>
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