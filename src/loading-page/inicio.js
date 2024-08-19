import React, { useEffect, useState } from 'react';
import './Css/styles.css';
import Navbar from './Navbar';
import evento1 from './imagenes/1.jpg';
import evento2 from './imagenes/2.jpg';
import evento3 from './imagenes/3.jpg';
import twitterLogo from './imagenes/Twitter-X-White-Logo-PNG-1.png';
import footerLogo from './imagenes/logo.jpg';

const Inicio = () => {
  useEffect(() => {
    // Agregar Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    // Agregar Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(bootstrapLink);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const moveSlide = (n) => {
      setCurrentIndex(prevIndex => (prevIndex + n + 3) % 3);
    };

    const showSlide = (n) => {
      const slides = document.querySelectorAll('.carousel-images img');
      const indicators = document.querySelectorAll('.carousel-indicators span');

      slides.forEach((slide, index) => {
        slide.style.display = 'none';
        indicators[index].className = '';
      });

      slides[n].style.display = 'block';
      indicators[n].className = 'active';
    };

    showSlide(currentIndex);

    // Cambio automático de diapositivas cada 3 segundos
    const intervalId = setInterval(() => {
      moveSlide(1);
    }, 3000);

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, [currentIndex]);

  return (
    <div>
      <Navbar title="Bienvenidos"/>

      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="typewriter-text" id="typewriter">Digital Event <br />Hub</h1>
          <h2>Divierte en nuestros eventos populares</h2>

          <div className="carousel">
            <div className="carousel-images">
              <img src={evento1} alt="Evento 1" width="1000" />
              <img src={evento2} alt="Evento 2" width="1000" />
              <img src={evento3} alt="Evento 3" width="1000" />
            </div>
            <button className="prev" onClick={() => setCurrentIndex((currentIndex - 1 + 3) % 3)}>&#10094;</button>
            <button className="next" onClick={() => setCurrentIndex((currentIndex + 1) % 3)}>&#10095;</button>
            <div className="carousel-indicators">
              <span className={currentIndex === 0 ? 'active' : ''} onClick={() => setCurrentIndex(0)}></span>
              <span className={currentIndex === 1 ? 'active' : ''} onClick={() => setCurrentIndex(1)}></span>
              <span className={currentIndex === 2 ? 'active' : ''} onClick={() => setCurrentIndex(2)}></span>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container-info">
          <div className="row justify-content-center">
            <div className="footer-section links col-6 col-sm-3">
              <h3>Enlaces</h3>
              <ul>
                <li><a href="/inicio">Inicio</a></li>
                <li><a href="/quienes-somos">¿Quienes Somos?</a></li>
                <li><a href="/privacidad">Privacidad</a></li>
                <li><a href="/servicios">Terminos y Condiciones</a></li>
              </ul>
            </div>
            <div className="footer-plataformas col-6 col-sm-3">
              <h5>Usa Digital Event Hub en</h5>
              <ul>
                <li><a href="/inicio">Android</a></li>
                <li><a href="/inicio">Iphone</a></li>
                <li><a href="/inicio">Mac/PC</a></li>
                <li><a href="/contacto">Digital Event Hub Web</a></li>
              </ul>
            </div>
            <div className="container-redes col-6 col-sm-3">
              <h4>Nuestras Redes Sociales</h4>
              <div className="social-icons">
                <a className="Facebook" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a className="Instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a className="Twitter-X" href="https://x.com" target="_blank" rel="noopener noreferrer">
                  <img src={twitterLogo} alt="X Logo" />
                </a>
                <a className="WhatsApp" href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                <a className="Youtube" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
              <p>¡Síguenos en nuestras redes sociales para estar informado!</p>
            </div>
          </div>
          <div className="footer-info-web">
            <h3>Contacto</h3>
            <p>Email: contacto@ejemplo.com</p>
            <p>Teléfono: +34 123 456 789</p>
            <p>Dirección: Calle Ejemplo 123, Ciudad, País</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container-logo-footer text-center text-md-left mb-3 mb-md-0">
            <img className="logo-footer" src={footerLogo} alt="EventHub" width="110" height="110" />
          </div>
          <p>2024&copy; Digital Event Hub. Todos los derechos reservados, condiciones y políticas de privacidad.</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
