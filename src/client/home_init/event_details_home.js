import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInformationNavbar from './event_navbar_home'; // Asegúrate de que la ruta sea correcta

const EventDetailClient = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [authorizedBy, setAuthorizedBy] = useState('Desconocido');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch event details from local API
                const response = await fetch(`http://localhost:4000/api/events/find/${eventId}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const selectedEvent = await response.json();
                setEvent(selectedEvent);

                // Fetch authorizedBy user details if exists
                if (selectedEvent.autorizado_por) {
                    const responseUser = await fetch(`http://localhost:4000/api/users/${selectedEvent.autorizado_por}`);
                    if (!responseUser.ok) {
                        throw new Error(`Error ${responseUser.status}: ${responseUser.statusText}`);
                    }
                    const userData = await responseUser.json();
                    setAuthorizedBy(userData.nombre);
                }

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

    return (
        <div>
            <EventInformationNavbar
                evento_id={event.evento_id}
                title={event.evento_nombre}
                imageUrl={event.imagen_url}
                date={`${new Date(event.fecha_inicio).toLocaleDateString()} - ${new Date(event.fecha_termino).toLocaleDateString()}`}
                time={`${event.horario_inicio_1} - ${event.horario_fin_1}, ${event.horario_inicio_2} - ${event.horario_fin_2}`}
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
