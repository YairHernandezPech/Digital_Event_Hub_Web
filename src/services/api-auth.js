// src/api.js
import axios from "axios";

const API_BASE_URL = "https://api-digital.fly.dev/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (email, contrasena) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      contrasena,
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/events/create`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el evento", error);
    throw error;
  }
};
