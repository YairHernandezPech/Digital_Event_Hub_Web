import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
import CompraDetalles from './client/tickets/CompraDetalles';
import HistorialCompra from './client/tickets/HistorialCompra';

const RedirectToCustomHTML = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirigir a custom-index.html dentro de custom-folder en la carpeta public
    window.location.href = '/landing-page/home.html';
  }, [navigate]);

  return null;
};

const App = () => {
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRol(decodedToken.rol);
      } catch (error) {
        setRol(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setRol(decodedToken.rol);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRol(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas del landing_page */}
          <Route path="/" element={<RedirectToCustomHTML />} />
          <Route path="/evento/:eventId" element={<EventDetail />} />

          {/* Rutas del login, registro y reset password */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/reset" element={<ResetPassword />} />

          {/* Rutas para navegar dentro del home client */}
          <Route path="/cliente/home" element={<HomeEventClient />} />
          <Route path="/evento/home/:eventId" element={<EventDetailClient />} />
          <Route path="/cliente/event/:id" element={<Escenarios />} />
          <Route path="/cliente/historypay" element={<HistorialCompra rol={rol} onLogout={handleLogout} />} />
          <Route path="/compra/:pago_id" element={<CompraDetalles />} />
          {/* Obtener tickets */}
          <Route path="/cliente/ticked/:eventId" element={<DialogTicket />} />

          {/* Rutas para navegar dentro del home admin y organizador */}
          <Route path="/login-admin" element={rol ? <Navigate to="/dashboard" /> : <LoginAdmin onLogin={handleLogin} />} />
          <Route path="/login-orga" element={rol ? <Navigate to="/dashboard" /> : <LoginOrga onLogin={handleLogin} />} />
          <Route path="/register-orga" element={rol ? <Navigate to="/dashboard" /> : <RegisterOrga />} />
          <Route path="/dashboard/*" element={rol ? <Dashboard rol={rol} onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
