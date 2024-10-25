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

                <nav id="nav-menu-container" className={isMobileNavOpen ? 'active' : ''}>
                    <ul className="nav-menu">
                        <li className="menu-active">
                            <Link to="/landing-page/home.html#home">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/landing-page/home.html#about">Acerca de</Link>
                        </li>
                        <li>
                            <Link to="/landing-page/home.html#speakers">Eventos</Link>
                        </li>
                        <li>
                            <Link to="/landing-page/home.html#venue">Galería</Link>
                        </li>
                        <li>
                            <Link to="/landing-page/home.html#contact">Contacto</Link>
                        </li>
                        <li className="buy-tickets">
                            <Link to="/landing-page/home.html#Membresias">
                                <i className="fa-solid fa-ticket fa-shake"></i> Membresías
                            </Link>
                        </li>
                        <li className="buy-tickets">
                            <Link to="/registro">Regístrate <i className="fa-solid fa-right-to-bracket fa-bounce"></i></Link>
                        </li>
                        <li className="buy-tickets">
                            <Link to="/login">Iniciar <i className="fa-solid fa-right-to-bracket fa-bounce"></i></Link>
                        </li>
                    </ul>
                </nav>
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
