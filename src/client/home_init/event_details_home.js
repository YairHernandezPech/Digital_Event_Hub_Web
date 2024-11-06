import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInformationNavbar from './event_navbar_home'; // Asegúrate de que la ruta sea correcta

const API_URL = process.env.REACT_APP_API_URL || 'https://api-digital.fly.dev/api';

const EventDetailClient = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [authorizedBy, setAuthorizedBy] = useState('Desconocido');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch event details from local API
                const response = await fetch(`${API_URL}/events/find/${eventId}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const selectedEvent = await response.json();
                setEvent(selectedEvent);
                console.log("evento:", selectedEvent)

                // Fetch authorizedBy user details if exists
                // if (selectedEvent.autorizado_por) {
                //     const responseUser = await fetch(`https://api-digital.fly.dev/api/users/${selectedEvent.autorizado_por}`);
                //     if (!responseUser.ok) {
                //         throw new Error(`Error ${responseUser.status}: ${responseUser.statusText}`);
                //     }
                //     const userData = await responseUser.json();
                //     setAuthorizedBy(userData.nombre);
                // }

            } catch (error) {
                setError(error.message);
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    // Display error message if something went wrong
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show loading message while fetching event data
    if (!event) {
        return <div>Cargando...</div>;
    }


    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
        <EventInformationNavbar
            evento_id={event.evento_id}
            title={event.evento_nombre}
            imageUrl={event.imagen_url}
            date={formatDate(event.fecha_inicio)}  // Usa la fecha formateada
            time={`${event.horario_inicio_1}, ${event.horario_inicio_2}`}
            description={event.descripcion}
            location={event.ubicacion}
            authorizedBy={authorizedBy}
            idScenary={event._id}
            precio={event.precio}
            max_per={event.max_per}
            horario_inicio_1={event.horario_inicio_1}
            horario_fin_1={event.horario_fin_1}
            horario_inicio_2={event.horario_inicio_2}
            horario_fin_2={event.horario_fin_2}
        />
    </div>
    );
};

export default EventDetailClient;
