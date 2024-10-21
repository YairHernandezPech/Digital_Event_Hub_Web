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
import axios from 'axios';

const CinemaPage = () => {
  const times = ['4:30 p.m.', '6:40 p.m.', '9:00 p.m.'];
  const todayIndex = new Date().getDay() - 1;
  const [selectedTimes, setSelectedTimes] = useState(Array(7).fill(''));
  const [openModal, setOpenModal] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [code, setPromoCode] = useState('');

  // Estado para manejar mensajes
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'

  const handleTimeClick = (time) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[todayIndex] = time;
    setSelectedTimes(newSelectedTimes);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handlePayment = async () => {
    try {
      const data = {
        movie: 'La Leyenda Del Dragón',
        time: selectedTimes[todayIndex],
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
        code
      };
      const response = await axios.post('https://api-digital.fly.dev/api/ticket/check', data);
      console.log('Pago realizado con éxito', response.data);

      // Establecer mensaje de éxito
      setMessage('Cupón aplicado y pago realizado con éxito.');
      setMessageType('success');
      handleCloseModal();
    } catch (error) {
      console.error('Error en el pago', error);

      // Establecer mensaje de error
      setMessage('Error al encontrar el código, vuelva a intentarlo mas');
      setMessageType('error');
    }
  };

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
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
              lg: '3rem',
            },
            textAlign: 'center',
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
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
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
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
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
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
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
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
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
            value={code}
            onChange={(e) => setPromoCode(e.target.value)}
          />

          {/* Mostrar mensaje dentro del modal */}
          {message && (
            <Typography
              variant="body2"
              sx={{
                mb: 2, // margen debajo del mensaje
                textAlign: 'center',
                color: messageType === 'success' ? 'green' : 'red',
              }}
            >
              {message}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            startIcon={<LocalMall />}
            onClick={handlePayment} // Aquí llamamos a la función de pago
          >
            Aplicar Cupón y Pagar
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
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
                    }}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Sección de Carrito */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, borderRadius: '12px' }}>
            <CardMedia
              component="img"
              height="140"
              image="https://es.web.img3.acsta.net/c_310_420/pictures/23/09/27/14/22/1427616.jpg"
              alt="movie poster"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                La Leyenda Del Dragón
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fecha: {new Date().toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Hora: {selectedTimes[todayIndex] || 'No seleccionada'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Precio: $10.00
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: '#6a1b9a' }}
                onClick={handleOpenModal}
              >
                Continuar al Pago
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CinemaPage;
