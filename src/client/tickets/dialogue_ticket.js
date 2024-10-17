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
  Modal,
  TextField,
  InputAdornment,
} from '@mui/material';
import { CreditCard, Person, CalendarToday, Lock, LocalMall } from '@mui/icons-material';

const CinemaPage = () => {
  const times = ['4:30 p.m.', '6:40 p.m.', '9:00 p.m.'];
  const todayIndex = new Date().getDay() - 1;
  const [selectedTimes, setSelectedTimes] = useState(Array(7).fill(''));
  const [openModal, setOpenModal] = useState(false);

  const handleTimeClick = (time) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[todayIndex] = time;
    setSelectedTimes(newSelectedTimes);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {/* Encabezado con imagen de fondo */}
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '60vh',
          backgroundImage: `url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgE7tmYPTMCfXtwS-CaLfGULcgfcS2UGp0BmlQl91BcMn9Nhv7S6LjQyWSrpp7bXHhq3xPeZeUlo7fDcpNtjBfxd9_McnWIIAWviZSCRDSl1W3reM7wnPLkeOI1Qj_32Ute4FjMCjJMMRY/s1773/portadas_gratis_para_dia_de_muertos+%25283%2529.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            zIndex: 2,
            padding: '0 1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '8px',
          }}
        >
          Selecciona tu horario y haz tu pago de boleto
        </Typography>
      </Box>

      {/* Modal de pago */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '12px',
            border: '2px solid #6a1b9a',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Información de Pago
          </Typography>

          <TextField
            fullWidth
            label="Número de Tarjeta"
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCard />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Nombre del Titular"
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Fecha de Expiración"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="MM/AA"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            ¿Tienes un código promocional?
          </Typography>
          <TextField
            fullWidth
            label="Código de Cupón"
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            startIcon={<LocalMall />}
            onClick={handleCloseModal}
          >
            Aplicar Cupón y Pagar
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
            Los boletos son válidos solo para el día y horario seleccionados. No se permiten reembolsos ni cambios.
          </Typography>
        </Box>
      </Modal>

      {/* Sección de horarios y carrito */}
      <Grid container spacing={2} sx={{ padding: '2rem' }}>
        <Grid item xs={12} md={8}>
          {/* Selección de Horarios */}
          <Paper elevation={3} sx={{ padding: '1.5rem', borderRadius: '12px' }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: 'center', mb: 2, color: '#6a1b9a' }}
            >
              Selección de Horario
            </Typography>
            <Grid container spacing={2}>
              {times.map((time) => (
                <Grid item xs={4} key={time}>
                  <Button
                    variant={selectedTimes[todayIndex] === time ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => handleTimeClick(time)}
                    sx={{
                      borderRadius: '8px',
                      color: selectedTimes[todayIndex] === time ? '#fff' : '#6a1b9a',
                      backgroundColor: selectedTimes[todayIndex] === time ? '#6a1b9a' : 'transparent',
                      borderColor: '#6a1b9a',
                      fontWeight: selectedTimes[todayIndex] === time ? 'bold' : 'normal',
                      '&:hover': {
                        backgroundColor: selectedTimes[todayIndex] === time ? '#4a148c' : '#f3e5f5',
                      },
                    }}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Carrito */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px', padding: '1rem' }}>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#6a1b9a',
                color: '#fff',
                padding: '0.6rem',
                borderRadius: '8px 8px 0 0',
                textAlign: 'center',
              }}
            >
              Compra de Boleto
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgE7tmYPTMCfXtwS-CaLfGULcgfcS2UGp0BmlQl91BcMn9Nhv7S6LjQyWSrpp7bXHhq3xPeZeUlo7fDcpNtjBfxd9_McnWIIAWviZSCRDSl1W3reM7wnPLkeOI1Qj_32Ute4FjMCjJMMRY/s1773/portadas_gratis_para_dia_de_muertos+%25283%2529.jpg"
              sx={{ borderRadius: '8px', mt: 1 }}
            />
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                La Leyenda Del Dragón
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Clasificación: A | Duración: 91 min
              </Typography>
              <Typography variant="body2">
                Hoy: {selectedTimes[todayIndex] || 'Seleccione un horario'}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              startIcon={<LocalMall />}
              onClick={handleOpenModal}
            >
              Proceder al Pago
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CinemaPage;
