import React, { useState, useEffect } from 'react';
import '../styles/pagos.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambia esto si es necesario

const Pagos = () => {
  const [membresias, setMembresias] = useState([]);
  const [membresia, setMembresia] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [montoFinal, setMontoFinal] = useState('');

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const response = await axios.get(`${API_URL}/membresias`);
        const filteredMembresias = response.data.filter(m => m.tipo === 'Plus' || m.tipo === 'Profesional');
        setMembresias(filteredMembresias);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMembresias();
  }, []);

  const handleMembresiaChange = (e) => {
    const selectedMembresia = membresias.find(m => m.tipo === e.target.value);
    setMembresia(e.target.value);
    setMontoFinal(selectedMembresia ? selectedMembresia.costo : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membresia, nombre, email }),
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('No se pudo obtener la URL de la sesión de pago.');
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
    }
  };

  return (
    <div className="container">
      <h1>Selecciona tu membresía</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="membresia">Membresía:</label>
          <select
            id="membresia"
            value={membresia}
            onChange={handleMembresiaChange}
            required
          >
            <option value="">Selecciona una membresía</option>
            {membresias.map(m => (
              <option key={m.membresia_id} value={m.tipo}>
                {m.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="montoFinal">Monto a pagar:</label>
          <input
            type="text"
            id="montoFinal"
            value={montoFinal}
            readOnly
          />
        </div>
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default Pagos;
