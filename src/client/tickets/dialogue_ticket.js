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
import { QRCodeCanvas } from 'qrcode.react';



const CinemaPage = () => {
  const times = ['4:30 p.m.', '6:40 p.m.', '9:00 p.m.'];
  const todayIndex = new Date().getDay() - 1;
  const [selectedTimes, setSelectedTimes] = useState(Array(7).fill(''));
  const [openModal, setOpenModal] = useState(false);
  const [openQRCodeModal, setOpenQRCodeModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [code, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleTimeClick = (time) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[todayIndex] = time;
    setSelectedTimes(newSelectedTimes);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const handleOpenQRCodeModal = () => setOpenQRCodeModal(true);
  const handleCloseQRCodeModal = () => setOpenQRCodeModal(false);

  const handlePayment = async () => {
    try {
      const data = {
        movie: 'La Leyenda Del Dragón',
        time: selectedTimes[todayIndex],
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
        code,
      };
      const response = await axios.post('http://localhost:4000/api/ticket/check', data);
      console.log('Pago realizado con éxito', response.data);

      setMessage('Cupón aplicado y pago realizado con éxito.');
      setMessageType('success');
      setTicketCode(response.data.ticketCode);
      setCouponCode(code);
      handleOpenQRCodeModal(); // Abrir modal del QR aquí
      handleCloseModal();
    } catch (error) {
      console.error('Error en el pago', error);
      setMessage('Error al encontrar el código, vuelva a intentarlo');
      setMessageType('error');
    }
  };

  const qrCodeValue = `${couponCode}`;

  return (
    <>
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

      {/* Modal de Información de Pago */}
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

          {message && (
            <Typography
              variant="body2"
              sx={{
                mb: 2,
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
            onClick={handlePayment}
          >
            Aplicar Cupón y Pagar
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            Los boletos son válidos solo para el día y horario seleccionados.
          </Typography>
        </Box>
      </Modal>

{/* Modal del Código QR */}
{/* Modal del Código QR */}
<Modal open={openQRCodeModal} onClose={handleCloseQRCodeModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '16px',
      border: '2px solid #6a1b9a',
      textAlign: 'center',
      width: { xs: '90%', sm: '400px' }, // Responsive width
    }}
  >
    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#6a1b9a' }}>
      ¡Aquí está tu Código QR!
    </Typography>
    <QRCodeCanvas id="qrCode" value={qrCodeValue} size={256} style={{ margin: '20px 0' }} />

    {/* Botón para descargar el QR */}
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2, px: 4 }}
      onClick={() => {
        const qrCanvas = document.getElementById('qrCode').querySelector('canvas');
        const qrUrl = qrCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = qrUrl;
        downloadLink.download = 'ticket_qr.png';
        downloadLink.click();
      }}
    >
      Descargar QR
    </Button>

    <Button
      variant="outlined"
      color="primary"
      onClick={handleCloseQRCodeModal}
      sx={{ mt: 3, px: 4 }}
    >
      Cerrar
    </Button>
  </Box>
</Modal>



      <Grid container spacing={2} sx={{ padding: '2rem' }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: '1rem' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              La Leyenda Del Dragón
            </Typography>
            <Typography variant="body1" paragraph>
              Sinopsis: Una emocionante historia de aventuras y amistad.
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Horarios:
            </Typography>
            {times.map((time, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleTimeClick(time)}
                sx={{
                  margin: '0.5rem',
                  backgroundColor: selectedTimes[todayIndex] === time ? '#6a1b9a' : 'inherit',
                  color: selectedTimes[todayIndex] === time ? '#fff' : 'inherit',
                }}
              >
                {time}
              </Button>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/140"
              alt="La Leyenda Del Dragón"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                La Leyenda Del Dragón
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sinopsis: Una emocionante historia de aventuras y amistad.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '1rem' }}
                onClick={handleOpenModal}
              >
                Proceder al Pago
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CinemaPage;
