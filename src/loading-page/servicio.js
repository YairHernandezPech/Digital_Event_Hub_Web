import React from 'react';
import './Css/styles.css'; // Asegúrate de que este archivo esté en la ruta correcta
// Asegúrate de que este archivo esté en la ruta correcta
import twitterLogo from './imagenes/Twitter-X-White-Logo-PNG-1.png';
import footerLogo from './imagenes/logo.jpg';
import eventos1 from './imagenes/eventos/7.jpg';
import eventos2 from './imagenes/eventos/1.webp';
import eventos3 from './imagenes/eventos/4.jpg';
import eventos4 from './imagenes/eventos/6.jpg';
import eventos5 from './imagenes/eventos/2.webp';
import eventos6 from './imagenes/eventos/3.webp';
import eventos7 from './imagenes/eventos/5.jpeg';
import eventos8 from './imagenes/eventos/8.jpeg';
import Navbar from './Navbar';

const Servicios = () => {
    return (
        <div>
            <Navbar title="Servicios"/>
            <div className="main-content">
                <div className="content-wrapper">
                    <h1 className="typewriter-text" id="typewriter">Conoce Los Proximos<br />Eventos</h1>
                    <h2>Eventos Públicos</h2>
                    <div className="eventos">
                        <img src={eventos1} alt="Evento Público 4" width="1000" />
                        <img src={eventos2} alt="Evento Público 1" width="1000" />
                        <img src={eventos3} alt="Evento Público 2" width="1000" />
                        <img src={eventos4} alt="Evento Público 3" width="1000" />
                    </div>
                    <h2>Eventos Privados</h2>
                    <div className="eventos">
                        <img src={eventos5} alt="Evento Privado 1" width="1000" />
                        <img src={eventos6} alt="Evento Privado 2" width="1000" />
                        <img src={eventos7} alt="Evento Privado 3" width="1000" />
                        <img src={eventos8} alt="Evento Público 1" width="1000" />
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
                                <li><a href="/contacto">¿Quienes Somos?</a></li>
                                <li><a href="/privacidad">Privacidad</a></li>
                                <li><a href="/servicios">Términos y Condiciones</a></li>
                            </ul>
                        </div>
                        <div className="footer-plataformas col-6 col-sm-3">
                            <h5>Usa Digital Event Hub en</h5>
                            <ul>
                                <li><a href="/inicio">Android</a></li>
                                <li><a href="/inicio">iPhone</a></li>
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

export default Servicios;
