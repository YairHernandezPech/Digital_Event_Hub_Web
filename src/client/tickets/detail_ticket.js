import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = ({ eventoId }) => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/tickets/event/${eventoId}`);
                setTickets(response.data);
            } catch (err) {
                console.error('Error al obtener los tickets:', err);
                setError('No se pudieron obtener los tickets.');
            }
        };

        fetchTickets();
    }, [eventoId]);

    return (
        <div>
            <h2>Tickets para el Evento ID: {eventoId}</h2>
            {error && <p>{error}</p>}
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>Ticket ID: {ticket.id}, Usuario: {ticket.usuario_id}</li>
                ))}
            </ul>
        </div>
    );
};

export default TicketList;
