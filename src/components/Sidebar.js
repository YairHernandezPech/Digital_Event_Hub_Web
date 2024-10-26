// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder, faTicket, faUsers, faCalendarDays, faUserGroup, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';

const Sidebar = ({ onLogout, role }) => {
  const [showDropdownCuentas, setShowDropdownCuentas] = useState(false);
  const [showDropdownMembresias, setShowDropdownMembresias] = useState(false);
  const [showDropdownContenido, setShowDropdownContenido] = useState(false);
  const [showDropdownEventos, setShowDropdownEventos] = useState(false);
  const [showDropdownAsistentes, setShowDropdownAsistentes] = useState(false);
  const [showDropdownGestion, setShowDropdownGestion] = useState(false);
  const [showDropdownMembresia, setShowDropdownMembresia] = useState(false);
  const [showDropdownverEventos, setShowDropdownverEventos] = useState(false);

  const toggleDropdownCuentas = () => {
    setShowDropdownCuentas(!showDropdownCuentas);
  };

  const toggleDropdownMembresias = () => {
    setShowDropdownMembresias(!showDropdownMembresias);
  };

  const toggleDropdownContenido = () => {
    setShowDropdownContenido(!showDropdownContenido);
  };

  const toggleDropdownEventos = () => {
    setShowDropdownEventos(!showDropdownEventos);
  };

  const toggleDropdownAsistentes = () => {
    setShowDropdownAsistentes(!showDropdownAsistentes);
  };

  const toggleDropdownGestion = () => {
    setShowDropdownGestion(!showDropdownGestion);
  };

  const toggleDropdownMembresia = () => {
    setShowDropdownMembresia(!showDropdownMembresia);
  };

  const toggleDropdownverEventos = () => {
    setShowDropdownverEventos(!showDropdownverEventos);
  };



  return (
    <div className="sidebar">
      <div>
        {role === 1 && (
          <>
            <h2>Dashboard</h2>
            <ul>
              <li className={showDropdownCuentas ? 'dropdown-active' : ''} onClick={toggleDropdownCuentas}>
                <FontAwesomeIcon icon={faUsers} className="menu-icon" />
                Cuentas
                {showDropdownCuentas && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownCuentas && (
                <ul>
                  <li className="roles-link">
                    <Link to="/dashboard/roles">Roles</Link>
                  </li>
                  <li className="usuarios-link">
                    <Link to="/dashboard/usuarios">Usuarios</Link>
                  </li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownMembresias ? 'dropdown-active' : ''} onClick={toggleDropdownMembresias}>
                <FontAwesomeIcon icon={faTicket} className="menu-icon" />
                Membresias
                {showDropdownMembresias && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownMembresias && (
                <ul>
                  <li className="membresias-link">
                    <Link to="/dashboard/membresias">Membresias</Link>
                  </li>
                  <li className="usuariosMembre-link">
                    <Link to="/dashboard/usuariosMembre">Usuarios con membresia</Link>
                  </li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownContenido ? 'dropdown-active' : ''} onClick={toggleDropdownContenido}>
                <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                Contenido
                {showDropdownContenido && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownContenido && (
                <ul>
                <li>
                  <Link to="/dashboard/aprobados">Eventos aprobados</Link>
                </li>
                <li>
                  <Link to="/dashboard/desaprobados">Eventos desaprobados</Link>
                </li>
                <li>
                  <Link to="/dashboard/pendientes">Eventos pendientes</Link>
                </li>
              </ul>
              )}
            </ul>
          </>
        )}

        {(role === 1 || role === 3) && (
          <>
            <h2>Organizador</h2>
            <ul>
              <li className={showDropdownMembresia ? 'dropdown-active' : ''} onClick={toggleDropdownMembresia}>
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Membresia
                {showDropdownMembresia && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownMembresia && (
                <ul>
                  <li>Ver membresia</li>
                  <li>
                    <Link to="/dashboard/membresia">Actualizar membresia</Link>
                  </li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownEventos ? 'dropdown-active' : ''} onClick={toggleDropdownEventos}>
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Eventos
                {showDropdownEventos && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownEventos && (
                <ul>
                <li>
                  <Link to="/dashboard/formulario">Formulario</Link>
                </li>
              </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownAsistentes ? 'dropdown-active' : ''} onClick={toggleDropdownAsistentes}>
                <FontAwesomeIcon icon={faUserGroup} className="menu-icon" />
                Asistentes
                {showDropdownAsistentes && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownAsistentes && (
                <ul>
                  <li>Asistentes 1</li>
                  <li>Asistentes 2</li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownGestion ? 'dropdown-active' : ''} onClick={toggleDropdownGestion}>
                <FontAwesomeIcon icon={faFolderOpen} className="menu-icon" />
                Gestion
                {showDropdownGestion && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownGestion && (
                <ul>
                  <li>Contenido 1</li>
                  <li>Contenido 2</li>
                </ul>
              )}
            </ul>
          </>
        )}

        {(role === 1 || role === 2) && (
          <>
            <h2>Cliente</h2>
            <ul>
              <li className={showDropdownverEventos ? 'dropdown-active' : ''} onClick={toggleDropdownverEventos}>
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Ver eventos
                {showDropdownverEventos && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownverEventos && (
                <ul>
                  <li>
                    <Link to="/dashboard/evento">Ver eventos</Link>
                  </li>
                </ul>
              )}
            </ul>
          </>
        )}
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
