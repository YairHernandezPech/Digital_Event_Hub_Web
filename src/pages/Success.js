// src/pages/Success.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/succes.css'; // Asegúrate de que el nombre del archivo CSS esté correcto

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Extrae parámetros de la URL
  const nombre = query.get('nombre') || 'Usuario';
  const membresia = query.get('membresia') || 'Desconocida';
  const cantidad = query.get('cantidad') || '0.00 MXN';
  const fechaHora = query.get('fechaHora') || new Date().toLocaleString();

  return (
    <section className="contain">
      <div className="content">
        <label>
          Muchas gracias por su pago en Digital Event,<br />
          el comprobante ha sido enviado a su correo electrónico,<br />
          cualquier duda, contacte el siguiente correo:<br />
          <a href="mailto:ayuda@digitalevent.mx">ayuda@digitalevent.mx</a>.<br />
          Nombre Completo: {nombre}<br />
          Membresía: {membresia}<br />
          Total Pagado: {cantidad}<br />
          Fecha: {fechaHora}<br />
          <a
            href={`https://wa.me/?text=Gracias%20por%20tu%20compra%20en%20Digital%20Event%21%20Nombre%3A%20${encodeURIComponent(nombre)}%20Membres%C3%ADa%3A%20${encodeURIComponent(membresia)}%20Total%20Pagado%3A%20${encodeURIComponent(cantidad)}%20Fecha%3A%20${encodeURIComponent(fechaHora)}`}
            className="whatsapp-button"
          >
            Compartir en WhatsApp
          </a>
        </label>
      </div>
    </section>
  );
};

export default Success;
