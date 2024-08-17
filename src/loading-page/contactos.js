import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import './Css/styles.css';
import './Css/contacto.css';
import logo from './imagenes/logo-2.png';
import twitterLogo from './imagenes/Twitter-X-White-Logo-PNG-1.png';
import footerLogo from './imagenes/logo.jpg';

const Contacto = () => {
    return (
        <div>
            <header>
                <div className="logo-container">
                    <img src={logo} alt="Logo" width="145" height="145" />
                    <h1>Contatanos</h1>
                </div>
                <nav>
                    <ul>
                        <li><a className="link" href="/">Inicio</a></li>
                        
                        <li><a className="link" href="/quienes-somos">Quienes Somos</a></li>
                        <li><a className="link" href="/servicios">Servicios</a></li>
                        <li><a className="link" href="/contacto">Contacto</a></li>
                        <li><a className="link" href="/cliente">Eventos</a></li>
                        <li><a href="login" className="login-button">Iniciar sesión</a></li>
                        <li><a href="registro" className="login-button">Registrarse</a></li>
                    </ul>
                </nav>
            </header>

            <div className="container-contacto">
                <div className="row justify-content-center">
                    <div className="col-6 col-sm-3 info">
                        <h1>Contáctanos</h1>
                        <p className="info-texto"><b>¡Realiza tus eventos con nosotros!</b>, Somos los mejores realizando Eventos, confía en nosotros.</p>
                        <p className="info-texto2">Si deseas consultar mayor información sobre nuestros servicios o tienes dudas al respecto, no dudes en contactarnos y uno de nuestros asesores se contactará contigo a la brevedad.</p>
                        <p>Aquí te dejamos información adicional para poder contactarnos:</p>
                        <p><strong>Dirección:</strong> Calle falsa 123, Ciudad, País</p>
                        <p><strong>Teléfono:</strong> +52 997 145 8999</p>
                        <p><strong>Correo Electrónico:</strong> ContactoDigitalEventHub@gmail.com</p>
                        <h5 className="horarios">Horarios de Atención</h5>
                        <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                        <p>Sábado: 10:00 AM - 2:00 PM</p>
                        <p>Domingos: Cerrado</p>
                        <p>También puedes usar este formulario para hacer preguntas directamente desde la Web.</p>
                    </div>
                    
                    <div className="col-6 col-sm-6">
                        <div className="formulario-contacto">
                            <h1 className="title">Contáctanos</h1>
                            <form action="">
                                <div className="row input-datos">
                                    <div className="form-group col-6 col-sm-6 input-nombre">
                                        <label htmlFor="nombre" className="required-label">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Ingresa tu nombre" required />
                                    </div>
                                    <div className="form-group col-6 col-sm-6">
                                        <label htmlFor="apellido" className="required-label">Apellido</label>
                                        <input type="text" className="form-control" placeholder="Ingresa tu apellido" required />
                                    </div>
                                    <div className="form-group col-sm-6 input-telefono">
                                        <label htmlFor="telefono" className="required-label">Teléfono</label>
                                        <input type="text" className="form-control" placeholder="Ingresa tu teléfono" required />
                                    </div>
                                </div><br />
                                <div className="row">
                                    <div className="form-group col-6 col-sm-6 input-correo">
                                        <label htmlFor="correo" className="required-label">Correo Electrónico</label>
                                        <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" required />
                                    </div>
                                    <div className="form-group col-6 col-sm-6">
                                        <label htmlFor="horario" className="required-label">Horario de Contacto</label>
                                        <input type="text" className="form-control" placeholder="Horario de contacto" required />
                                    </div>
                                    <div className="form-group input-motivo">
                                        <label htmlFor="motivo" className="required-label">Motivo</label>
                                        <textarea className="form-control" placeholder="Motivo de contacto" rows="2"></textarea>
                                    </div>
                                    <div className="form-group col-6 col-sm-6">
                                        <label htmlFor="consulta" className="required-label">Tipo de consulta</label>
                                        <select name="select-consulta" id="consulta" className="form-control" required>
                                            <option value="">Selecciona una opción</option>
                                            <option value="informacion">Información sobre el servicio</option>
                                            <option value="feedback">Feedback y Sugerencias</option>
                                            <option value="reclamaciones">Reclamaciones</option>
                                            <option value="soporte">Soporte técnico</option>
                                            <option value="reserva">Reserva de Boletos</option>
                                            <option value="precios">Precios</option>
                                            <option value="membresias">Membresías y Paquetes para Organizador</option>
                                            <option value="requisitos">Requisitos y Procedimientos para Registrar mi evento</option>
                                            <option value="disponibilidad">Disponibilidad de horario</option>
                                            <option value="descuentos">Descuentos y ofertas</option>
                                            <option value="otro">Otro...</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-6 col-sm-6">
                                        <label htmlFor="canal-preferido" className="required-label">Canal de contacto</label>
                                        <select name="canal" id="canal-preferido" className="form-control">
                                            <option value="">Selecciona una opción</option>
                                            <option value="telefono">Teléfono</option>
                                            <option value="correo">Correo Electrónico</option>
                                            <option value="whatsapp">WhatsApp</option>
                                        </select>
                                    </div>
                                </div><br />
                                <button className="Boton">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div><br />

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
                                <a className="Facebook" href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                                <a className="Instagram" href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                <a className="Twitter-X" href="#" target="_blank" rel="noopener noreferrer"><img src={twitterLogo} alt="X Logo" /></a>
                                <a className="WhatsApp" href="#" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                                <a className="Youtube" href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
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
                        <img className="logo-footer d-block mx-auto" src={footerLogo} alt="EventHub" width="110" height="110" />
                    </div>
                    <p>2024&copy; Digital Event Hub. Todos los derechos reservados, condiciones y políticas de privacidad.</p>
                </div>
            </footer>
        </div>
    );
};

export default Contacto;
