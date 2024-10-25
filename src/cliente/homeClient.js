import React from 'react';


const HomeClient = () => (
  <div className="home-client">
    <h1>Bienvenido, Cliente</h1>
    <h2>Panel de Eventos</h2>
    <p>Aquí puedes ver y gestionar tus eventos.</p>
    <div className="summary">
      <div className="card">
        <h3>Ver Eventos</h3>
        <p>Consulta todos los eventos en los que estás inscrito.</p>
        <button>Ver Eventos</button>
      </div>
      <div className="card">
        <h3>Registrarse en Evento</h3>
        <p>Únete a nuevos eventos disponibles.</p>
        <button>Registrarse en Evento</button>
      </div>
      <div className="card">
        <h3>Mi Perfil</h3>
        <p>Gestiona tu información personal y preferencias.</p>
        <button>Mi Perfil</button>
      </div>
    </div>
    <div className="recent-activities">
      <h2>Actividades Recientes</h2>
      <ul>
        <li>Inscrito en "Maratón de Verano" el 15 de julio de 2024</li>
        <li>Actualización de perfil completada</li>
        <li>Nuevo evento "Conferencia Tech" disponible</li>
      </ul>
    </div>
  </div>
);

export default HomeClient;
