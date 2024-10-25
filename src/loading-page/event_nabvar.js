import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, styled, Card, CardContent, Grid, IconButton, Drawer, Stack, Box, Chip } from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../img/LOGO HUB BLANCO 3.png'; 
import '../styles/navbars.css';

// Estilos para el primer Navbar
const NavbarContainer = styled(AppBar)(({ theme, backgroundImage }) => ({
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
    backgroundColor: '#88158d',
    padding: '10px 20px',
    borderRadius: '20px 0px 0px 0px',
};

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
    fontSize: '2rem', // Ajustado para que se vea mejor en móvil
    [theme.breakpoints.up('sm')]: {
        fontSize: '4.5rem', // Más grande en pantallas más grandes
    },
}));

const Info = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'medium',
    marginBottom: theme.spacing(1),
}));

const MapCard = styled(Card)(({ theme }) => ({
    height: '300px', // Ajustado para que se vea mejor en móvil
    width: '100%',
}));

const InfoCard = styled(Card)(({ theme }) => ({
    height: '300px', // Ajustado para que se vea mejor en móvil
    width: '100%',
}));

const EventNavbar = ({ title, description, imageUrl, date, time, location, category, eventType, organizer, authorizedBy }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 15,
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new window.google.maps.Marker({
                        map,
                        position: results[0].geometry.location,
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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            {/* Primer Navbar con fondo de imagen */}
            <NavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{ width: '80%' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ display: { xs: 'block', sm: 'none' } }} // Mostrar solo en móviles
                    >
                        <MenuIcon />
                    </IconButton>

                    {organizer && <Info variant="body1">Organizado por {organizer}</Info>}

                    <Stack direction="column" spacing={1} alignItems="flex-start" sx={{ width: '100%' }}>
                        <Title variant="h1" paddingTop={10} style={{ color: "white" }}>{title}</Title>
                        <Chip label={eventType} color={eventType === 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight: '800', fontSize: '1rem' }} />
                        <Info variant="body1">Descripción: {description}</Info>
                        <Info variant="body1">Fecha: {date} a las {time}</Info>
                        {location && <Info variant="body1" paddingBottom={10}>Te esperamos en {location}</Info>}
                    </Stack>
                </Toolbar>
                <div style={floatingDivStyle}>
                    <Typography variant="h4" fontWeight={800} fontSize={35}>Categoría: {category}</Typography>
                </div>
            </NavbarContainer>

            <Box sx={{
                width: '100%', // Asegura que el contenedor ocupe el 100% del ancho disponible
                display: 'flex', // Utiliza flex para centrar los hijos
                flexDirection: 'column', // Coloca los elementos en una columna
                alignItems: 'center', // Alinea los elementos al centro
                margin: '0 auto',
                paddingTop: '20px', // Espacio superior para mejor visualización
            }}>
                <Grid container spacing={2} sx={{ maxWidth: '600px' }}> {/* Ajusta el ancho máximo */}
                    <Grid item xs={12}>
                        <MapCard>
                            <CardContent>
                                <div id="map" style={{ width: '100%', height: '300px' }}></div>
                            </CardContent>
                        </MapCard>
                    </Grid>
                    <Grid item xs={12}>
                        <InfoCard>
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
                                    <strong>Descripción:</strong> {description}
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
                                    <strong>Organizado por:</strong> {organizer}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Autorizado por:</strong> {authorizedBy}
                                </Typography>
                            </CardContent>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default EventNavbar;
