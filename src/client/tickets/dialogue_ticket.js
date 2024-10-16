import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { AccessTime, LocalMall, CheckCircle } from '@mui/icons-material';

const CinemaPage = () => {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const times = ['4:30 p.m.', '6:40 p.m.', '9:00 p.m.'];
  const todayIndex = new Date().getDay() - 1; // Obtener el índice del día actual (0 = Domingo)
  const [selectedTimes, setSelectedTimes] = useState(Array(days.length).fill(''));

  const handleTimeClick = (time) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[todayIndex] = time; // Establecer el horario en la posición del día actual
    setSelectedTimes(newSelectedTimes);
  };

  return (
    <>
      {/* Header with Background Image occupying full page */}
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          backgroundImage: `url(https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay to Darken Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          Selecciona tu cine y el horario de tu función
        </Typography>
      </Box>

      {/* Cart Section positioned outside the header */}
      <Card
        sx={{
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          zIndex: 4,
          padding: '0.5rem',
          width: '250px',
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            marginBottom: '0.5rem',
            backgroundColor: '#6a1b9a',
            color: '#fff',
            padding: '0.3rem',
            borderRadius: '4px 4px 0 0',
            fontSize: '1rem',
          }}
        >
          Tu carrito - $75.00
        </Typography>
        <CardMedia
          component="img"
          height="120"
          image="https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.jpeg"
          alt="La Leyenda Del Dragón"
        />
        <CardContent sx={{ padding: '0.5rem' }}>
          <Typography variant="body1" fontWeight="bold" fontSize="0.9rem">
            La Leyenda Del Dragón
          </Typography>
          <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
            Clasificación: A | Duración: 91 min
          </Typography>
          <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
            Apta para todo público.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            Cine: La Isla Mérida
          </Typography>
          <Typography variant="body2" fontSize="0.8rem">
            Hoy, 16 de octubre, {selectedTimes[todayIndex] || 'Seleccione un horario'}
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary" fullWidth startIcon={<LocalMall />}>
          Proceder al pago
        </Button>
      </Card>

      {/* Main Section */}
      <Grid container spacing={2} sx={{ padding: '1rem' }}>
        {/* Cine Selection */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            {/* Cine and Date Selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Button variant="outlined" startIcon={<AccessTime />} sx={{ marginRight: '0.5rem', fontSize: '0.8rem' }}>
                La Isla Mérida
              </Button>
              <Button variant="outlined" startIcon={<AccessTime />} sx={{ fontSize: '0.8rem' }}>
                16 OCT
              </Button>
            </Box>

            {/* Movie Times */}
                {/* Render Days of the Week */}
                <Grid container item justifyContent="space-between">
                  {days.map((day) => (
                    <Grid item xs={1.5} key={day}>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#6a1b9a',
                          color: '#fff',
                          padding: '0.2rem',
                          borderRadius: '5px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
          </Paper>
        </Grid>

        {/* Calendar Section */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              padding: '0.5rem',
              backgroundColor: '#f5f5f5',
            }}
          >
            {/* Calendar Grid */}
            <Paper
              elevation={3}
              sx={{
                padding: '0.3rem',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
            >
              <Grid container spacing={0.5}>


                {/* Render Time Slots */}
                {days.map((day, index) => (
                  <Grid container item justifyContent="space-between" key={day}>
                    {times.map((time, timeIndex) => (
                      <Grid item xs={1.5} key={`${day}-${time}`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            height: '40px',
                            border: '1px solid #6a1b9a',
                            '&:hover': {
                              backgroundColor: '#6a1b9a',
                              color: '#fff',
                            },
                            fontSize: '0.7rem',
                            color: selectedTimes[index] === time ? 'white' : '#6a1b9a', // Change text color based on selection
                            backgroundColor: selectedTimes[index] === time ? 'green' : 'transparent', // Change background color based on selection
                          }}
                          onClick={() => handleTimeClick(time)} // Set selected time on click
                        >
                          {selectedTimes[index] || time} {/* Show selected time */}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CinemaPage;
