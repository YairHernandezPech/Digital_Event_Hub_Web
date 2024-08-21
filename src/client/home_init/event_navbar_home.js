import React, { useEffect, useState } from 'react'; // Asegúrate de importar useState
import { AppBar, Toolbar, Typography, Grid, Fab, styled, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import SeatIcon from '@mui/icons-material/EventSeat';
import ClientNavbarHome from './navbar_home';
import { useNavigate } from 'react-router-dom';

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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Superposición oscura
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
    backgroundColor: '#88158d', // Color para visualizar el div flotante
    padding: '10px 20px',
    borderRadius: '20px 0px 0px 0px',
};

const CustomTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
}));

const CustomInfo = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'medium',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const Info = styled(Typography)(({ theme }) => ({
    textAlign: 'left', // Align info text to the left
    fontSize: '1rem',
    fontWeight: 'medium',
    marginBottom: theme.spacing(1), // Add margin below each info item
}));

const CustomMapCard = styled(Card)(({ theme }) => ({
    height: '400px',
    width: '100%',
}));

const CustomInfoCard = styled(Card)(({ theme }) => ({
    height: '400px',
    width: '100%',
    marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left', // Align title to the left
    marginBottom: theme.spacing(1), // Add margin below the title
    fontSize: '4.5rem'
}));

const EventInformationNavbar = ({ title, imageUrl, date, time, location, category, eventType, authorizedBy, idScenary, description }) => {
    const [user, setUser] = useState(null); // Asegúrate de definir el estado aquí
    const navigate = useNavigate(); // Hook para navegación

    const handleSeatSelection = () => {
        console.log('Redirecting to:', `/cliente/event/${idScenary}`); // Agrega este log para depuración
        window.location.href = `/cliente/event/${idScenary}`;
    };

    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 }, // Latitud y Longitud por defecto
                zoom: 15
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
                    console.log('Geocode results:', results); // Agrega este log para depuración
                    map.setCenter(results[0].geometry.location);
                    new window.google.maps.Marker({
                        map,
                        position: results[0].geometry.location
                    });
                } else {
                    console.error('Geocode no fue exitoso debido a: ' + status);
                }
            });
        };

        if (window.google && window.google.maps) {
            initMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCkJwrcOuqFszjXYAJDDepaFA3dGkble88`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        }
    }, [location]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate("/login"); // Redirige al login si no hay datos del usuario
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login"); // Redirige al login después de cerrar sesión
    };

    return (
        <>
            <ClientNavbarHome user={user} onLogout={handleLogout} /><hr/><br/><br/>
            <CustomNavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{ width: '90%' }}>
                    {authorizedBy && <Info variant="body1">Organizado por {authorizedBy}</Info>}

                    <Stack direction="row" spacing={1}>
                        <Title variant="h1" style={{color:"white"}}>{title}</Title>
                        <Chip label={eventType} color={eventType === 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight: '800', fontSize: '1rem' }} />
                    </Stack>
                    <p>Description: {description}</p>

                    <Info variant="body1">Fecha: {date} a las {time}</Info>
                    {location && <Info variant="body1">Te esperamos en el {location}</Info>}
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
            }}
            >
                <Grid container spacing={2} style={{ width: '90%' }}>
                    <Grid item xs={12} sm={6}>
                        <CustomMapCard>
                            <CardContent>
                                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                            </CardContent>
                        </CustomMapCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInfoCard>
                            <CardContent>
                                <Typography variant="h6">Información Adicional</Typography>
                                <Typography variant="body2">
                                    <strong>Título:</strong> {title}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Fecha:</strong> {date}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Hora:</strong> {time}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>{description}</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Ubicación:</strong> {location}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Categoría:</strong> {category}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Tipo de Evento:</strong> {eventType}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Autorizado por:</strong> {authorizedBy}
                                </Typography>
                            </CardContent>
                        </CustomInfoCard>
                    </Grid>
                </Grid>
            </Box>

            {/* Boton para navegar al evento */}
            <Fab color="secondary" aria-label="add" variant="extended" onClick={handleSeatSelection} sx={{
                position: 'fixed',
                bottom: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: '5px',
            }}>
                <SeatIcon sx={{ mr: 1 }} /> Seleccionar Asientos
            </Fab>
        </>
    );
};

export default EventInformationNavbar;
