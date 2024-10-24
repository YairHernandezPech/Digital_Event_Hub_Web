import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Fab, styled, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import SeatIcon from '@mui/icons-material/EventSeat';
import ClientNavbarHome from './navbar_home';
import { useNavigate } from 'react-router-dom';
import DialogTicket from '../tickets/dialogue_ticket';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api-digital.fly.dev/api';

// Estilos para el primer Navbar
const CustomNavbarContainer = styled(AppBar)(({ theme, backgroundImage }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: theme.spacing(2),
    boxShadow: 'none',
    position: 'relative',
    zIndex: 1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    '& > div': {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

const floatingDivStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#88158d',
    padding: '10px 20px',
    borderRadius: '20px 0px 0px 0px',
};

const CustomTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
}));

const CustomInfoCard = styled(Card)(({ theme }) => ({
    height: '400px',
    width: '100%',
    marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
    fontSize: '4.5rem'
}));

const EventInformationNavbar = ({ title, imageUrl, date, time, location, category, eventType, authorizedBy, idScenary, description, evento_id }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    // Nueva función para redirigir a la compra de boletos con evento_id
    const handleTicketPurchase = () => {
        console.log('Redirecting to ticket purchase with evento_id:', evento_id);
        navigate(`/cliente/ticked/${evento_id}`);  // Redirigir usando el evento_id
    };

    useEffect(() => {
        const userData = localStorage.getItem("token");
        if (userData) {
            const decodedToken = jwtDecode(userData);
            setUser({ id: decodedToken.id, rol: decodedToken.rol });
        } else {
            navigate("/login"); // Redirige al login si no hay datos del usuario
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };
    useEffect(() => {
        if (user && user.id) {
            axios.get(`${API_URL}/users/${user.id}`)
                .then(response => {
                    setUserId(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [user]);

    return (
        <>
            <ClientNavbarHome user={userId} onLogout={handleLogout} />
            <hr />
            <br />
            <br />
            <CustomNavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{ width: '90%' }}>
                    {authorizedBy && <Typography variant="body1">Organizado por {authorizedBy}</Typography>}

                    <Stack direction="row" spacing={1}>
                        <Title variant="h1" style={{color:"white"}}>{title}</Title>
                        <Chip label={eventType} color={eventType === 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight: '800', fontSize: '1rem' }} />
                    </Stack>
                    <p>Description: {description}</p>
                    <Typography variant="body1">Fecha: {date} a las {time}</Typography>
                    {location && <Typography variant="body1">Te esperamos en el {location}</Typography>}
                    <br />
                </Toolbar>
                <div style={floatingDivStyle}>
                    <Typography variant="h4" fontWeight={800}>Categoría: {category}</Typography>
                </div>
            </CustomNavbarContainer>

            <Box sx={{
                width: '100%',
                '@media (min-width:600px)': {
                    width: '90%'
                },
                margin: '0 auto'
            }}>
                <Grid container spacing={2} style={{ width: '90%' }}>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInfoCard>
                            <CardContent>
                                <Typography variant="h6">Información Adicional</Typography>
                                <Typography variant="body2"><strong>Título:</strong> {title}</Typography>
                                <Typography variant="body2"><strong>Fecha:</strong> {date}</Typography>
                                <Typography variant="body2"><strong>Hora:</strong> {time}</Typography>
                                <Typography variant="body2"><strong>Descripción:</strong> {description}</Typography>
                                <Typography variant="body2"><strong>Ubicación:</strong> {location}</Typography>
                                <Typography variant="body2"><strong>Categoría:</strong> {category}</Typography>
                                <Typography variant="body2"><strong>Tipo de Evento:</strong> {eventType}</Typography>
                                <Typography variant="body2"><strong>Autorizado por:</strong> {authorizedBy}</Typography>
                            </CardContent>
                        </CustomInfoCard>
                    </Grid>
                </Grid>
            </Box>

            {/* Botón para redirigir a la compra de boletos */}
            <Fab color="secondary" aria-label="add" variant="extended" onClick={handleTicketPurchase} sx={{
                position: 'fixed',
                bottom: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: '5px',
            }}>
                <SeatIcon sx={{ mr: 1 }} /> Comprar boletos
            </Fab>
        </>
    );
};

export default EventInformationNavbar;
