import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Css/newStyles.css'; // Asegúrate de que el archivo CSS esté importado

const HomeEvent = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedEventType, setSelectedEventType] = useState('Publico');

    const filterRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api-digitalevent.onrender.com/api/events/get/approved')
            .then(response => response.json())
            .then(data => {
                const publicEvents = data.filter(event => event.tipo_evento === 'Publico');
                setEvents(publicEvents);
                setFilteredEvents(publicEvents);
                const uniqueCategories = [...new Set(publicEvents.map(event => event.categoria))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const applyFilters = () => {
        setFilteredEvents(
            events.filter(event =>
                event.evento_nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory ? event.categoria === selectedCategory : true) &&
                (selectedEventType ? event.tipo_evento === selectedEventType : true)
            )
        );
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedCategory, selectedEventType, events]);

    const toggleFilters = () => {
        setShowFilters(prevState => !prevState);
    };

    const handleEventClick = (eventId) => {
        navigate(`/evento/${eventId}`);
    };

    return (
        <div>
            <Navbar title="Eventos"/>
            <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
                    <div style={{ flex: '1 1 auto', maxWidth: '600px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Buscar eventos..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: 'calc(100% - 60px)',
                                padding: '12px 20px',
                                borderRadius: '30px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                                marginRight: '10px',
                                fontSize: '1em'
                            }}
                        />
                        <FaSearch
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '40px',
                                transform: 'translateY(-50%)',
                                color: '#6D3089',
                                fontSize: '1.2em'
                            }}
                        />
                    </div>
                    <button
                        onClick={toggleFilters}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            backgroundColor: '#6D3089',
                            color: 'white',
                            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '10px',
                            fontSize: '1em'
                        }}
                    >
                        <FaFilter style={{ marginRight: '10px' }} />
                        Filtros
                    </button>
                </div>

                {showFilters && (
                    <div ref={filterRef} style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                        <h3>Filtros</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Categoría</label>
                            <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
                            >
                                <option value="">Todas</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Evento</label>
                            <select
                                value={selectedEventType}
                                onChange={e => setSelectedEventType(e.target.value)}
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
                            >
                                <option value="Publico">Publico</option>
                            </select>
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
                    {filteredEvents.map(event => (
                        <div
                            key={event.evento_id}
                            className="card"
                            onClick={() => handleEventClick(event.evento_id)}
                        >
                            <div className="card-image-container">
                                <img
                                    src={event.imagen_url || 'default-image-url.jpg'}
                                    alt={event.evento_nombre}
                                    className="card-image"
                                />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-content">
                                <h4 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px', color:'white' }}>{event.evento_nombre}</h4>
                                <p style={{ fontSize: '1em', margin: '10px' }}>{event.descripcion}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    
                                    <p style={{ margin: '10px', fontSize: '0.9em', color: '#ddd', display: 'flex', alignItems: 'center' }}>

                                        <FaMapMarkerAlt style={{ marginRight: '5px', fontSize: '1em' }} />
                                        {event.ubicacion}
                                    </p>
                                    <p style={{ margin: '0', fontSize: '0.9em', color: '#ddd', display: 'flex', alignItems: 'center' }}>
                                        <FaCalendarAlt style={{ marginRight: '5px', fontSize: '1em' }} />
                                        {new Date(event.fecha_inicio).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeEvent;
