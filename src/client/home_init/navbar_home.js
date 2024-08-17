import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from '../../loading-page/imagenes/logo-2.png';


const ClientNavbarHome = () => {
  return (
    <header>

      <nav>
        <ul>
        <div className="logo-container">
          <img src={logo} alt="Logo" width="140" height="140" />
        </div>
        
        </ul>
      </nav>
    </header>
  );
};

export default ClientNavbarHome;
