import React from 'react';
import '../styles/homeAdmin.css';

const HomeAdmin = () => (
  <div className="home-admin">
    <h1>Buenas tardes, Administrador</h1>
    <div className="cards-container">
      <div className="card">
        <div className="card-header">
          <span className="icon users-icon"></span>
          <h2>Usuarios</h2>
          <p className="card-count"></p>
        </div>
        <ul className="card-options">
          <li>+ Añadir Usuario</li>
          <li>Ver Usuarios</li>
          <li>Importar Usuarios</li>
        </ul>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="icon groups-icon"></span>
          <h2>Roles</h2>
          <p className="card-count"></p>
        </div>
        <ul className="card-options">
          <li>+ Añadir rol</li>
          <li>Ver Roles</li>
          <li>Importar Rol</li>
        </ul>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="icon apps-icon"></span>
          <h2>Contenido</h2>
          <p className="card-count"></p>
        </div>
        <ul className="card-options">
          <li>+ Añadir Aplicación</li>
          <li>Ver Aplicaciones</li>
        </ul>
      </div>
    </div>

    <div className="applications-section">
      <h2>Notificaciones</h2>
      <div className="application-card">
        <span className="application-icon"></span>
        <p>Sin notificaciones</p>
      </div>
    </div>

    <div className="recent-users-section">
      <h2>Usuarios Recientes</h2>
      <p>No se encontraron usuarios.</p>
    </div>
  </div>
);

export default HomeAdmin;
