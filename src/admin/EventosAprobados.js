import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/eventosAprobados.css';

const Aprobados = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const response = await axios.get('https://api-digitalevent.onrender.com/api/events/get/approved');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los eventos');
        setLoading(false);
      }
    };

    fetchApprovedEvents();
  }, []);

  if (loading) {
    return <div className="loader">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="aprobados-container">
      <h1 className="title">Eventos Aprobados</h1>
      {events.length === 0 ? (
        <p className="no-events">No hay eventos aprobados en este momento.</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.imagen_url} alt={event.evento_nombre} className="event-image" />
              <h2 className="event-title">{event.evento_nombre}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aprobados;
