import axios from 'axios';

// Define la URL de la API
const API_URL = 'https://api-digitalevent.onrender.com/api/eventos/events';

// Función para obtener eventos
export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
