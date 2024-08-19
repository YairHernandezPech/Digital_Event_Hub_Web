import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventNavbar from './event_nabvar'; // Asegúrate de que la ruta sea correcta
import { CircularProgress, Box } from '@mui/material';
import Header from './Navbar';

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch('https://api-digitalevent.onrender.com/api/events/get/img');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                const selectedEvent = data.find(event => event.evento_id === parseInt(eventId));
                setEvent(selectedEvent);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return 
    }

    return (
        <div>
            <Header/>
            <EventNavbar
                title={event.evento_nombre}
                description={event.descripcion}
                imageUrl={event.imagen_url}
                date={`${new Date(event.fecha_inicio).toLocaleDateString()} - ${new Date(event.fecha_termino).toLocaleDateString()}`}
                time={event.hora}
                location={event.ubicacion}
                category={event.categoria}
                eventType={event.tipo_evento}
                organizer={event.organizador_nombre}
                authorizedBy={event.autorizado_nombre}
            />
        </div>
    );
};

export default EventDetail;
