import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Fab, styled, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SeatIcon from '@mui/icons-material/EventSeat';

// Estilos para el primer Navbar
const CustomNavbarContainer = styled(AppBar)(({ theme, backgroundImage }) => ({
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: theme.spacing(2),
    boxShadow: 'none',
    '& .MuiToolbar-root': {
        backgroundColor: 'transparent',
    },
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
    height: '400px',
    width: '100%',
}));

const CustomInfoCard = styled(Card)(({ theme }) => ({
    height: '400px',
    width: '100%',
    marginLeft: theme.spacing(2),
}));

// Estilo para el botón flotante
const FloatingButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: 1000,
}));

const EventInformationNavbar = ({ title, imageUrl, date, time, location, category, eventType, authorizedBy, idScenary }) => {
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

    return (
        <>
            <CustomNavbarContainer position="static" backgroundImage={imageUrl}>
                <Toolbar style={{width:'90%'}}>
                    <CustomTitle variant="h1">{title}</CustomTitle>
                    <CustomInfo variant="body1">
                        <CalendarTodayIcon /> {date} a las {time}
                    </CustomInfo>
                    <CustomInfo variant="body1">
                        <LocationOnIcon /> {location}
                    </CustomInfo>
                    <CustomInfo variant="body1">
                        <EventIcon /> Evento {eventType} de {category}
                    </CustomInfo>
                    <CustomInfo variant="body1">
                        <VerifiedUserIcon /> {authorizedBy}
                    </CustomInfo>
                    <br />
                </Toolbar>
            </CustomNavbarContainer>

            
            <Grid container spacing={2} style={{width:'90%'}}>
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
                            <Typography variant="body2">Aquí puedes agregar más detalles o información adicional sobre el evento.</Typography>
                        </CardContent>
                    </CustomInfoCard>
                </Grid>
            </Grid>
            

            {/* Boton para navegar al evento */}
            <FloatingButton color="primary" aria-label="select seat" onClick={handleSeatSelection}>
                <SeatIcon />
            </FloatingButton>
            <br />
            <hr />
        </>
    );
};

export default EventInformationNavbar;
