import React from 'react';
import "../../../styles/style.css";
import { AppBar, Typography, styled, Chip, Stack, Box } from '@mui/material';

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

const floatingDivStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#88158d', // Color para visualizar el div flotante
    padding: '10px 20px',
    borderRadius: '20px 0px 0px 0px',
};

const Header = ({ eventData }) => {
    console.log(eventData)
    return (


            <CustomNavbarContainer position="static" backgroundImage={eventData?.imagen_url ?? ""}>
            <div style={{width:'90%'}}>
                

                    <Stack direction="row" spacing={1}>
                        <Title variant="h1">{eventData.evento_nombre}</Title>
                        <Chip label={eventData.tipo_evento} color={eventData.tipo_evento == 'Publico' ? 'primary' : 'secondary'} sx={{ fontWeight:'800', fontSize:'1rem' }} />
                    </Stack>
                    <p>Description: {eventData.descripcion}</p>

                    { eventData.ubicacion && <Info variant="body1">Te esperamos en el {eventData.ubicacion}</Info> }
                    <br />
                    </div>
                <div style={floatingDivStyle}>
                <Typography variant="h4" fontWeight={800}>Categoría: {eventData.categoria}</Typography>
                </div>
            </CustomNavbarContainer>
        
    );
}

export default Header;