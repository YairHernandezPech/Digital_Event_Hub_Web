import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  


  const todayIndex = new Date().getDay() - 1;

  // const times = ['4:30 p.m.', '6:40 p.m.', '9:00 p.m.'];
  // const [selectedTimes, setSelectedTimes] = useState(Array(7).fill(''));

  
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

  const handleTimeClick = (schedule) => {
    setSelectedTimeId(schedule.horario_id); // Almacena el horario_id correctamente
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[todayIndex] = schedule.hora_inicio; // Almacena el tiempo seleccionado
    setSelectedTimes(newSelectedTimes);
  };

  console.log(selectedTimeId);

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


   // Función para obtener los datos del evento
   useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/events/find/${eventId}`);
        const data = await response.json();
        setEventData(data);
  
        // Ahora que tenemos el evento, vamos a obtener los horarios
        const schedulesResponse = await fetch(`http://localhost:4000/api/schedule/by-event/${data.evento_id}`);
        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData); // Almacena los horarios en el estado
      } catch (error) {
        console.error('Error fetching event details or schedules:', error);
      }
    };
  
    fetchEventDetails();
  }, [eventId]);
  

  const qrCodeValue = `${couponCode}`;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '60vh',
          backgroundImage: eventData ? `url(${eventData.imagen_url})` : 'none',
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
{/* HORARIO */}
 <Grid item xs={12} md={8}>
    <Paper sx={{ padding: '1rem' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {eventData && <h1>{eventData.evento_nombre}</h1>}
      </Typography>
      <Typography variant="body1" paragraph>
      {eventData && <p>{eventData.descripcion}</p>}
      </Typography>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Horarios:
      </Typography>

      <Grid container spacing={1}>
        {schedules.map((schedule, index) => (
          <Grid item key={index}>
            <Button
              onClick={() => {
                console.log("hola")
              }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: selectedTimes[todayIndex] === schedule.hora_inicio ? '#6a1b9a' : 'inherit',
                color: selectedTimes[todayIndex] === schedule.hora_inicio ? '#fff' : 'inherit',
                textAlign: 'left',
                width: '100%', // Para que ocupe todo el espacio
                borderRadius: '8px', // Opcional: para bordes redondeados
              }}
            >
              <Typography variant="body1" sx={{ marginRight: '1rem' }}>
                {schedule.hora_inicio} - {schedule.hora_fin} {/* Mostrar hora de inicio y fin */}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia
              component="img"
              height="140"
              image={eventData ? eventData.imagen_url : 'https://via.placeholder.com/140'}
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
