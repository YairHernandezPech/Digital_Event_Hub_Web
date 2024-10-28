import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder, faTicket, faUsers, faCalendarDays, faUserGroup, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';

const Sidebar = ({ onLogout, rol }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="sidebar">
      <div>
        {rol === 1 && (
          <>
            <h2>Dashboard</h2>
            <ul>
              <li
                className={activeDropdown === 'cuentas' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('cuentas')}
              >
                <FontAwesomeIcon icon={faUsers} className="menu-icon" />
                Cuentas
                {activeDropdown === 'cuentas' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'cuentas' && (
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
              <li
                className={activeDropdown === 'membresias' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('membresias')}
              >
                <FontAwesomeIcon icon={faTicket} className="menu-icon" />
                Membresias
                {activeDropdown === 'membresias' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'membresias' && (
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
              <li
                className={activeDropdown === 'contenido' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('contenido')}
              >
                <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                Contenido
                {activeDropdown === 'contenido' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'contenido' && (
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

        {(rol === 1 || rol === 3) && (
          <>
            <h2>Organizador</h2>
            <ul>
              <li
                className={activeDropdown === 'membresia' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('membresia')}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Membresia
                {activeDropdown === 'membresia' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'membresia' && (
                <ul>
                  <li>
                    <Link to="/dashboard/Ver-Membresia">Ver membresia</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/membresia">Actualizar membresia</Link>
                  </li>
                </ul>
              )}
            </ul>
            <ul>
              <li
                className={activeDropdown === 'eventos' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('eventos')}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Eventos
                {activeDropdown === 'eventos' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'eventos' && (
                <ul>
                  <li>
                    <Link to="/dashboard/formulario">Formulario</Link>
                  </li>
                </ul>
              )}
            </ul>
            <ul>
              <li
                className={activeDropdown === 'asistentes' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('asistentes')}
              >
                <FontAwesomeIcon icon={faUserGroup} className="menu-icon" />
                Asistentes
                {activeDropdown === 'asistentes' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'asistentes' && (
                <ul>
                  <li>Asistentes 1</li>
                  <li>Asistentes 2</li>
                </ul>
              )}
            </ul>
            <ul>
              <li
                className={activeDropdown === 'gestion' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('gestion')}
              >
                <FontAwesomeIcon icon={faFolderOpen} className="menu-icon" />
                Gestion
                {activeDropdown === 'gestion' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'gestion' && (
                <ul>
                  <li>
                    <Link to="/dashboard/cupones">Cupones</Link>
                  </li>
                </ul>
              )}
            </ul>
          </>
        )}

        {(rol === 1 || rol === 2) && (
          <>
            <h2>Cliente</h2>
            <ul>
              <li
                className={activeDropdown === 'verEventos' ? 'dropdown-active' : ''}
                onClick={() => toggleDropdown('verEventos')}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Ver eventos
                {activeDropdown === 'verEventos' && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {activeDropdown === 'verEventos' && (
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
