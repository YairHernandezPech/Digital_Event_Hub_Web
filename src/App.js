import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// Importar los componentes de las páginas
import Escenarios from './client/Escenarios/componentes/Escenarios';
import EventDetail from './loading-page/event_detail';
import EventDetailClient from './client/home_init/event_details_home';
import HomeEventClient from './client/home_init/EventDetailClient';
import Login from './auth/login';
import Registro from './auth/register';
import ResetPassword from './auth/reset_password';
import LoginOrga from './pages/LoginOrga';
import LoginAdmin from './pages/LoginAdmin';
import RegisterOrga from './pages/RegisterOrga';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import DialogTicket from './client/tickets/dialogue_ticket';

const RedirectToCustomHTML = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirigir a custom-index.html dentro de custom-folder en la carpeta public
    window.location.href = '/landing-page/home.html';
  }, [navigate]);

  return null;


};

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setRole(decodedToken.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas del lading_Page*/}
          <Route path="/" element={<RedirectToCustomHTML />} />
          <Route path="/evento/:eventId" element={<EventDetail />} />


          {/* Rutas del login, registro y reset password*/}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/reset" element={<ResetPassword />} />

          {/* Rutas para navegar dentro del home client */}
          <Route path="/cliente/home" element={<HomeEventClient />} />
          <Route path="/evento/home/:eventId" element={<EventDetailClient />} />
          <Route path="/cliente/event/:id" element={<Escenarios />} />
          {/* Obtebner ticketts */}
          <Route path="/cliente/ticked" element={<DialogTicket />} />

          {/* Rutas para navegar dentro del home admin y organizador*/}
          <Route path="/login-admin" element={role ? <Navigate to="/dashboard" /> : <LoginAdmin onLogin={handleLogin} />} />
          <Route path="/login-orga" element={role ? <Navigate to="/dashboard" /> : <LoginOrga onLogin={handleLogin} />}/>
          <Route path="/register-orga" element={role ? <Navigate to="/dashboard" /> : <RegisterOrga />} />
          <Route path="/dashboard/*" element={role ? <Dashboard role={role} onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/success" element={<Success />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
