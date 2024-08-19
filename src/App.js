import React, { useEffect } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importar los componentes de las páginas
import Escenarios from './client/Escenarios/componentes/Escenarios';
import EventDetail from './loading-page/event_detail';
import EventDetailClient from './client/home_init/event_details_home';
import HomeEventClient from './client/home_init/EventDetailClient';
import Login from './auth/login';
import Registro from './auth/register';
import ResetPassword from './auth/reset_password';


const RedirectToCustomHTML = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a custom-index.html dentro de custom-folder en la carpeta public
    window.location.href = '/landing-page/home.html';
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
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



      </Routes>
    </Router>
  );
};

export default App;
