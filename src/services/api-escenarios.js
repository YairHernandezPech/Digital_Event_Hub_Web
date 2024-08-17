// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://api-digitalevent.onrender.com/api/auth/';

// Función para iniciar sesión
export const loginAuth = async (email, contrasena) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, contrasena });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

// Puedes agregar más funciones aquí si es necesario (por ejemplo, registro, logout, etc.)
