import React, { useState } from 'react';
import logo from '../img/LOGO HUB BLANCO 3.png';
import '../styles/navbars.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
        document.body.classList.toggle('mobile-nav-active');
    };

    return (
        <header id="header">
            <div className='container4'>
                <div id="logo4" className="pull-left">
                    <a href="/landing-page/home.html" className="scrollto4">
                        <img src={logo} alt="" title="" />
                    </a>
                </div>

                {/* Botón para el menú móvil */}
                <button id="mobile-nav-toggle" onClick={toggleMobileNav}>
                    <i className="fa fa-bars"></i>
                </button>

                
            </div>

            {/* Menú móvil */}
            <div id="mobile-nav" className={isMobileNavOpen ? 'active' : ''}>
                <ul>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/#about">Acerca de</Link></li>
                    <li><Link to="/#speakers">Eventos</Link></li>
                    <li><Link to="/#venue">Galería</Link></li>
                    <li><Link to="/#contact">Contacto</Link></li>
                    <li><Link to="/#Membresias">Membresías</Link></li>
                    <li><Link to="/registro">Regístrate</Link></li>
                    <li><Link to="/login">Iniciar</Link></li>
                </ul>
                </ul>
            </div>
        </header>
    );
};

export default Header;
