import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Fab, styled, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import SeatIcon from '@mui/icons-material/EventSeat';
import ClientNavbarHome from './navbar_home';
import { useNavigate } from 'react-router-dom';

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
    backgroundColor: '#88158d',
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

const CustomMapCard = styled(Card)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: theme.spacing(2), // Añade un poco de espacio interno
}));

const CustomInfoCard = styled(Card)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: theme.spacing(2), // Añade un poco de espacio interno
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
    fontSize: '2rem',
}));

const EventInformationNavbar = ({ title, imageUrl, date, time, location, category, eventType, authorizedBy, idScenary, description }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSeatSelection = () => {
        console.log('Redirecting to:', `/cliente/event/${idScenary}`);
        window.location.href = `/cliente/event/${idScenary}`;
    };

    const DialogTicket = () => {
        navigate('/cliente/ticked');
    };

    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
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

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <ClientNavbarHome user={user} onLogout={handleLogout} /><hr/><br/><br/>
            <CustomNavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{ width: '100%' }}>
                    {authorizedBy && <CustomInfo variant="body1">Organizado por {authorizedBy}</CustomInfo>}
                    <Stack direction="row" spacing={1} alignItems="center" style={{ width: '100%' }}>
                        <Title variant="h1" style={{ color: "white", flex: 1 }}>{title}</Title>
                        <Chip label={eventType} color={eventType === 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight: '800', fontSize: '1rem' }} />
                    </Stack>
                    <CustomInfo variant="body1">Fecha: {date} a las {time}</CustomInfo>
                    {location && <CustomInfo variant="body1">Te esperamos en el {location}</CustomInfo>}
                </Toolbar>
                <div style={floatingDivStyle}>
                    <Typography variant="h4" fontWeight={800}>Categoría: {category}</Typography>
                </div>
            </CustomNavbarContainer>

            <Box sx={{
                width: '100%',
                margin: '0 auto',
            }}>
                <Grid container spacing={3} sx={{ width: '100%', margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
                    <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
                        <CustomMapCard style={{ flex: 1 }}>
                            <CardContent>
                                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                            </CardContent>
                        </CustomMapCard>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
                        <CustomInfoCard style={{ flex: 1 }}>
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

            <Fab color="secondary" aria-label="add" variant="extended" onClick={DialogTicket} sx={{
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
