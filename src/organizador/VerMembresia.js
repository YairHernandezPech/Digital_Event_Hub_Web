import React from 'react';
import '../styles/verMembresia.css';
import stripeLogo from '../img/stripe.svg';

const VerMembresia = ({ membershipType, userName }) => {
  let cardClass = '';

  switch (membershipType) {
    case 'VIP':
      cardClass = 'vip-card';
      break;
    case 'Básica':
      cardClass = 'basic-card';
      break;
    default:
      cardClass = 'default-card';
  }

  return (
    <div className="membership-container">
      <h1>Tu tienes una membresía:</h1>
      <div className={`membership-card ${cardClass}`}>
        <div className="card-content">
          <div className="membership-type">
            {membershipType} <p>Basica</p>
          </div>
          <div className="user-name">
            {userName} <p>Glendi Uh</p>
          </div>
        </div>
      </div>
      <div className="unlock-features">
        <p>¿Deseas desbloquear nuevas funciones?</p>
        <button
          className="stripe-pay-button"
          onClick={() => window.location.href = "http://localhost/Pagos/pagos.php"}
        >
          <img src={stripeLogo} alt="Stripe Logo" />
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default VerMembresia;
