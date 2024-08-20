import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      {/* Logo del negocio */}
      <div className="navbar-logo">
        <img src="https://ingenieros2023.utpproyectos.com.mx/PinkSoftware2/img/logo3.png" alt="Logo" />
      </div>
      <div className="navbar-search-container">
        <i className="fas fa-list navbar-list-icon"></i> {/* Icono añadido aquí */}
        <div className="navbar-search">
          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="Buscar..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
      <div className="navbar-icons">
        <i className="fas fa-bell"></i>
        <i className="fas fa-cog"></i>
        <div className="navbar-user">
        <img src=/*{user.profilePicture}*/"http://ingenieros2023.utpproyectos.com.mx/imagenes/perfil.jpg" alt="Perfil" className="navbar-user-profile" />
        <span className="navbar-user-name">{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
