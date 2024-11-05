import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null); // Simular datos del usuario
  const [availableTicketsH1, setAvailableTicketsH1] = useState(null);
  const [availableTicketsH2, setAvailableTicketsH2] = useState(null);
  const [loading, setLoading] = useState(true);

  const [schedules, setSchedules] = useState([]);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);



  const todayIndex = new Date().getDay() - 1;



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



  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenQRCodeModal = () => setOpenQRCodeModal(true);
  const handleCloseQRCodeModal = () => setOpenQRCodeModal(false);

  const handlePayment = async () => {
    try {
      const data = {
        evento_id: eventId,
        code: code,
        horario_id: selectedTimeId
      };
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      //SUBIR Y ACTUALIZAR CUPONES CON PAGOS, ¡¡¡¡¡EXCLUSIVO PARA PAGOS CON CUPONES!!!!
      const response = await axios.post('https://api-digital.fly.dev/api/ticket/redeem', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Pago realizado con éxito', response.data);

      setMessage('Cupón aplicado y pago realizado con éxito.');
      setMessageType('success');
      setTicketCode(response.data.ticketCode);
      setCouponCode(code);
      handleOpenQRCodeModal(); // Abrir modal del QR aquí
      handleCloseModal();
    } catch (error) {
      console.error('Error en el pago', error);

      if (error.response) {
        if (error.response.status === 404) {
          setMessage('El cupón no existe o ya ha sido canjeado.');
        } else {
          setMessage('Error al procesar el pago, vuelva a intentarlo.');
        }
        setMessageType('error');
      } else if (error.request) {
        setMessage('No se recibió respuesta del servidor, por favor intente más tarde.');
        setMessageType('error');
      } else {
        setMessage('Error inesperado: ' + error.message);
        setMessageType('error');
      }
    }
  };


  // Función para descargar el div como imagen
  const downloadQRCodeAsImage = () => {
    const canvas = document.querySelector('.qr-code canvas');
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'ticket_qr.png';
    link.click();
  };


  console.log("Dato que recibe redeem", selectedTimeId);
  // Función para obtener los datos del evento
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://api-digital.fly.dev/api/events/find/${eventId}`);
        const data = await response.json();
        setEventData(data);

        // Ahora que tenemos el evento, vamos a obtener los horarios
        const schedulesResponse = await fetch(`https://api-digital.fly.dev/api/schedule/by-event/${data.evento_id}`);
        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData); // Almacena los horarios en el estado
      } catch (error) {
        console.error('Error fetching event details or schedules:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);


  const qrCodeValue = `${couponCode}`;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const responseH1 = await fetch('https://api-digital.fly.dev/api/ticket/available/h1');
        const dataH1 = await responseH1.json();
        console.log('Tickets Horario 1:', dataH1);

        const responseH2 = await fetch('https://api-digital.fly.dev/api/ticket/available/h2');
        const dataH2 = await responseH2.json();
        console.log('Tickets Horario 2:', dataH2);

        // Asegúrate de usar el nombre correcto de la propiedad
        setAvailableTicketsH1(dataH1.tickets_disponibles);
        setAvailableTicketsH2(dataH2.tickets_disponibles);

      } catch (error) {
        console.error('Error al obtener los tickets disponibles:', error);
      }
    };

    fetchTickets();
  }, []);


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

        {/* Botón en la esquina superior izquierda */}
        <Button
          variant="contained"
          href="/cliente/home"
          sx={{
            position: 'absolute',
            top: '20px', // Margen desde la parte superior
            left: '20px', // Margen desde la parte izquierda
            zIndex: 2, // Asegura que esté visible sobre la imagen
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombra del botón
            backgroundColor: '#5c0a5c', // Color de fondo personalizado
            color: '#fff', // Color de texto blanco
            '&:hover': {
              backgroundColor: '#4b084b', // Color de fondo al hacer hover
            }
          }}
        >
          Volver a Inicio
        </Button>


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
            Información de Canjeo
          </Typography>


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
            Aplicar Cupón
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
        {/* Contenedor de evento y tickets disponibles */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: '1rem' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4" fontWeight="bold">
                  {eventData && eventData.evento_nombre}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    border: '1px solid #7D287D', 
                    borderRadius: '4px', 
                    padding: '8px', 
                    marginBottom: '8px', 
                    backgroundColor: '#E8DAEF' 
                  }}
                >
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Horario 18:30
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {availableTicketsH1 !== null && availableTicketsH1 !== undefined
                      ? `${availableTicketsH1} tickets disponibles`
                      : 'Cargando...'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    border: '1px solid #7D287D',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '8px',
                    backgroundColor: '#E8DAEF'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Horario 20:30
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {availableTicketsH2 !== null && availableTicketsH2 !== undefined
                      ? `${availableTicketsH2} tickets disponibles`
                      : 'Cargando...'}
                  </Typography>
                </Box>
              </Grid>

            </Grid>

            <Typography variant="body1" paragraph>
              {eventData && eventData.descripcion}
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Selecciona el horario:
            </Typography>

            {/* Contenedor de horarios */}
            <Grid container spacing={1}>
              {schedules.map((schedule, index) => (
                <Grid item key={index}>
                  <Button
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelectedTimeId(schedule.horario_id);
                      console.log("parametro que se pasa a SelectedTimeID:", schedule.horario_id);
                    }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      backgroundColor: selectedIndex === index ? '#8e44ad' : '#d2b4de',
                      color: selectedIndex === index ? '#4a235a' : '#8e44ad',
                      textAlign: 'left',
                      width: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="body1" sx={{ marginRight: '1rem' }}>
                      {schedule.hora_inicio}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Contenedor de imagen y botón de canjeo */}
        <Grid item xs={12} md={4}>
          {eventData && (
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {eventData.evento_nombre}
            </h4>
          )}
          <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia
              component="img"
              height="140"
              image={eventData ? eventData.imagen_url : 'https://via.placeholder.com/140'}
            />
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '1rem' }}
                onClick={handleOpenModal}
                disabled={!selectedTimeId} // Deshabilita el botón si no hay horario seleccionado
              >
                Proceder al canjeo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  );
};

export default CinemaPage;