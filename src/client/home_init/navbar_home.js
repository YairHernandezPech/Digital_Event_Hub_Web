// ClientNavbarHome.jsx
import React from 'react';
import logo from '../../img/LOGO HUB BLANCO 3.png';
import '../../styles/navbars.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const ClientNavbarHome = ({ user, onLogout }) => {
  const [users, setUser] = useState()
  const fetchUsersById = () => {
    axios.get(`${API_URL}/users/${user.id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  return (
    <header id="header">
      <div className='container4'>
        <div id="logo4" class="pull-left">

          <a href="/cliente/home" class="scrollto4"><img src={logo} alt="" title="" /></a>
        </div>
        <nav id="nav-menu-container">
          <ul className="nav-menu">

            {/* Mostrar los enlaces según si el usuario está autenticado o no */}
            {users ? (
              <>
                <li>
                  <a href="/cliente/home">
                    <strong>Bienvenido, {user.nombre}</strong>
                  </a>
                </li>
                <li className="buy-tickets">
                  <a href="/cliente/historypay">Historial de Compra</a>
                </li>
                <li className="buy-tickets">
                  <a href="#" onClick={onLogout}>Cerrar Sesión</a>
                </li>

              </>
            ) : (
              <>
                <li className="buy-tickets"><a href="/registro">Regístrate <i className="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
                <li className="buy-tickets"><a href="/login">Iniciar Sesión <i className="fa-solid fa-right-to-bracket fa-bounce"></i></a></li>
              </>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ClientNavbarHome;