import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInformationNavbar from './event_navbar_home'; // Asegúrate de que la ruta sea correcta


const EventDetailClient = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [scenary, setScenary] = useState(null);
    const [authorizedBy, setAuthorizedBy] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch event details
                const response = await fetch('https://api-digitalevent.onrender.com/api/events/get/img');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                const selectedEvent = data.find(event => event.evento_id === parseInt(eventId));
                setEvent(selectedEvent);

                // Fetch scenary details
                const responseEscenarios = await fetch('https://api-digitalevent.onrender.com/api/escenarios');
                if (!responseEscenarios.ok) {
                    return;
                }
                const responseEscenariosJSON = await responseEscenarios.json();
                const selectedScenary = responseEscenariosJSON.find((item) => item.evento_id === selectedEvent.evento_id);
                setScenary(selectedScenary);

                // Fetch authorizedBy user details
                if (selectedEvent && selectedEvent.autorizado_por) {
                    const responseUser = await fetch(`https://api-digitalevent.onrender.com/api/users/${selectedEvent.autorizado_por}`);
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event || !scenary) {
        return 
    }

    return (
        <div>
            <EventInformationNavbar
                title={event.evento_nombre}
                imageUrl={event.imagen_url}
                date={`${new Date(event.fecha_inicio).toLocaleDateString()} - ${new Date(event.fecha_termino).toLocaleDateString()}`}
                time={event.hora}
                description={event.descripcion}
                location={event.ubicacion}
                category={event.categoria}
                eventType={event.tipo_evento}
                authorizedBy={authorizedBy}
                idScenary={scenary.escenario_id}
            />
        </div>
    );
};

export default EventDetailClient;
