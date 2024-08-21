// HomeEventClient.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/newStyles.css'
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ClientNavbarHome from './navbar_home';

const HomeEventClient = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [categories, setCategories] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedEventType, setSelectedEventType] = useState('');
    const [user, setUser] = useState(null);

    const filterRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api-digitalevent.onrender.com/api/events/get/approved')
            .then(response => response.json())
            .then(data => {
                console.log('Datos de eventos:', data);
                setEvents(data);
                setFilteredEvents(data);
                const uniqueCategories = [...new Set(data.map(event => event.categoria))];
                const uniqueEventTypes = [...new Set(data.map(event => event.tipo_evento))];
                setCategories(uniqueCategories);
                setEventTypes(uniqueEventTypes);
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
        navigate(`/evento/home/${eventId}`);
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate("/login"); // Redirige al login si no hay datos del usuario
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>
            {/* <ClientNavbarHome /> */}
              {/* {user ? (
        <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
                Bienvenido, {user.nombre}!
            </Typography>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '10px',
                    marginBottom: '0px'
                }}
            >
                <Typography variant="body1" color="textSecondary">
                    <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    <strong>Teléfono:</strong> {user.telefono}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    <strong>Apellido:</strong> {user.last_name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    <strong>Tu rol:</strong> {user.rol_id}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleLogout} 

            >
                Cerrar Sesión
            </Button>
                </Typography>
            </Box>

        </CardContent>
            ) : (
            <p>Cargando...</p>
            )} */}
            <ClientNavbarHome user={user} onLogout={handleLogout} /><hr/><br/><br/>
            <div style={{ padding: '30px'}}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '2em', fontWeight: 'bold' }}>Eventos Digital Event Hub:</h1>

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
                            borderRadius: '25px',
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
                    <div ref={filterRef} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
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
                                <option value="">Todos</option>
                                {eventTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', maxWidth: '1140px',margin: '0px auto' }}>
                    {filteredEvents.map(event => (
                        <div
                            key={event.evento_id}
                            className="card3"
                            onClick={() => handleEventClick(event.evento_id)}
                        >
                            <div className="card-image-container3">
                                <img
                                    src={event.imagen_url || 'default-image-url.jpg'}
                                    alt={event.evento_nombre}
                                    className="card-image3"
                                />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-content3">
                                <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px', color: 'white' }}>{event.evento_nombre}</h2>
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

export default HomeEventClient;
