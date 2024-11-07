import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const CanjeoQR = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [code, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openQRCodeModal, setOpenQRCodeModal] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const qrRef = useRef(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenQRCodeModal = () => setOpenQRCodeModal(true);
  const handleCloseQRCodeModal = () => setOpenQRCodeModal(false);

  const handlePayment = async () => {
    try {
      const data = {
        evento_id: eventId,
        code: code,
        id_horario: selectedTimeId, // Enviar id_horario correctamente
      };
      
      const response = await axios.post('https://api-digital.fly.dev/api/canjeo-sin-registro', data);
      
      setMessage('Cupón aplicado y pago realizado con éxito.');
      setMessageType('success');
      setTicketCode(response.data.ticketCode);
      setQrCodeValue(response.data.ticketCode);
      handleOpenQRCodeModal();
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
      }
    }
  };
  

  const downloadQRCodeAsImage = () => {
    const canvas = qrRef.current;
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'codigo_qr.png';
    link.click();
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://api-digital.fly.dev/api/events/find/${eventId}`);
        const data = await response.json();
        setEventData(data);

        const schedulesResponse = await fetch(`https://api-digital.fly.dev/api/schedule/by-event/${data.evento_id}`);
        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error fetching event details or schedules:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Obtener el horario seleccionado
  const selectedSchedule = schedules.find((schedule) => schedule.horario_id === selectedTimeId);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" fontWeight="bold">{eventData && eventData.evento_nombre}</Typography>
      <Typography variant="body1" paragraph>{eventData && eventData.descripcion}</Typography>
      
      <Typography variant="h6" fontWeight="bold" gutterBottom>Selecciona el horario:</Typography>
      <Grid container spacing={1}>
        {schedules.map((schedule, index) => (
          <Grid item key={index}>
            <Button
              onClick={() => setSelectedTimeId(schedule.horario_id)}
              sx={{
                padding: '0.5rem',
                backgroundColor: selectedTimeId === schedule.horario_id ? '#8e44ad' : '#d2b4de',
                color: '#fff',
                textAlign: 'left',
                width: '100%',
                borderRadius: '8px',
              }}
            >
              <Typography variant="body1">{schedule.hora_inicio}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        disabled={!selectedTimeId}
        sx={{ marginTop: '1rem' }}
      >
        Proceder al canjeo
      </Button>

      {/* Modal de Información de Pago */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', width: 400, margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>Información de Canjeo</Typography>
          <TextField
            fullWidth
            label="Código de Cupón"
            variant="outlined"
            sx={{ mb: 2 }}
            value={code}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          {message && (
            <Typography variant="body2" sx={{ color: messageType === 'success' ? 'green' : 'red' }}>
              {message}
            </Typography>
          )}
          <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
            Aplicar Cupón
          </Button>
        </Box>
      </Modal>

      {/* Modal del Código QR */}
      <Modal open={openQRCodeModal} onClose={handleCloseQRCodeModal}>
        <Box sx={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', width: 400, margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>¡Aquí está tu Código QR!</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Horario seleccionado: {selectedSchedule ? selectedSchedule.hora_inicio : 'No seleccionado'}
          </Typography>
          <QRCodeCanvas ref={qrRef} value={qrCodeValue} size={256} style={{ margin: '20px 0' }} />
          <Button variant="outlined" color="primary" onClick={handleCloseQRCodeModal}>
            Cerrar
          </Button>
          <Button variant="outlined" color="primary" onClick={downloadQRCodeAsImage} sx={{ marginTop: '1rem' }}>
            Descargar QR como PNG
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CanjeoQR;
