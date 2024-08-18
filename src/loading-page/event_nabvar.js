import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, styled, Card, CardContent, Grid } from '@mui/material';
import { Chip, Stack, Box } from '@mui/material';

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
    backgroundColor: '#88158d', // Color para visualizar el div flotante
    padding: '10px 20px',
    borderRadius: '20px 0px 0px 0px',
};

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left', // Align title to the left
    marginBottom: theme.spacing(1), // Add margin below the title
    fontSize: '4.5rem'
}));

const Info = styled(Typography)(({ theme }) => ({
    textAlign: 'left', // Align info text to the left
    fontSize: '1rem',
    fontWeight: 'medium',
    marginBottom: theme.spacing(1), // Add margin below each info item
}));

const MapCard = styled(Card)(({ theme }) => ({
    height: '400px', // Adjust the height as needed
    width: '100%',
}));

const InfoCard = styled(Card)(({ theme }) => ({
    height: '400px', // Same height as the map
    width: '100%',
    marginLeft: theme.spacing(2), // Add space between the map and the info card
}));

const EventNavbar = ({ title, description, imageUrl, date, time, location, category, eventType, organizer, authorizedBy }) => {
    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 }, // Latitud y Longitud por defecto
                zoom: 15
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
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

    return (
        <>
            {/* Primer Navbar con fondo de imagen */}
            <NavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{ width: '90%' }}>
                    {organizer && <Info variant="body1">Organizado por {organizer}</Info>}

                    <Stack direction="row" spacing={1}>
                        <Title variant="h1">{title}</Title>
                        <Chip label={eventType} color={eventType == 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight: '800', fontSize: '1rem' }} />
                    </Stack>
                    <p>Description: {description}</p>

                    <Info variant="body1">Fecha: {date} a las {time}</Info>
                    {location && <Info variant="body1">Te esperamos en el {location}</Info>}
                    <br />
                </Toolbar>
                <div style={floatingDivStyle}>
                    <Typography variant="h4" fontWeight={800}>Categoría: {category}</Typography>
                </div>
            </NavbarContainer>
            <Box sx={{
                width: '100%',
                '@media (min-width:600px)': {
                    width: '90%'
                },
                margin: '0 auto'
            }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <MapCard>
                            <CardContent>
                                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                            </CardContent>
                        </MapCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                <Info variant="h1">{description}</Info>
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
                                {/* Aquí puedes agregar más detalles o información adicional sobre el evento. */}
                            </CardContent>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Box>

        </>
    );
};

export default EventNavbar;
