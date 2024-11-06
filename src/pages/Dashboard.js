import React from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Navbar from '../components/Navbar';
import Roles from './Roles';
import Usuarios from './Usuarios';
import Permisos from './Permisos';
import Membresias from './Membresias';
import UsuarioMembre from './UsuariosMembre';
import Membresia from '../organizador/Membresia';
import Formulario from '../organizador/Formulario';
import UpdateEvent from '../organizador/updateEvent';
import Aprobados from '../admin/EventosAprobados';
import Desaprobados from '../admin/EventosDesaprobados';
import Pendientes from '../admin/EventosPendientes';
import Cupones from '../organizador/Cupones';
import RegistroQR from '../organizador/RegistroQR';
import CanjeoQR from '../organizador/CanjeoQR';

const Dashboard = ({ rol, onLogout }) => {
  const match = useMatch('/dashboard/*');

  if (!rol) {
    return <Navigate to="/login" />;
  }

  const user = {}; // Esto puede configurarse según el contexto o token de autenticación

  return (
    <div>
      <Navbar user={user} />
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%', marginTop: '70px' }}>
        <Sidebar onLogout={onLogout} rol={rol} />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MainContent rol={rol} user={user} />} />
            <Route path="roles" element={<Roles />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="permisos/:roleId" element={<Permisos />} />
            <Route path="membresias" element={<Membresias />} />
            <Route path="usuariosMembre" element={<UsuarioMembre />} />
            <Route path="membresia" element={<Membresia />} />
            <Route path="formulario" element={<Formulario />} />
            <Route path="updateEvent/:evento_id" element={<UpdateEvent />} />
            <Route path="aprobados" element={<Aprobados />} />
            <Route path="desaprobados" element={<Desaprobados />} />
            <Route path="cupones" element={<Cupones />} />
            <Route path="pendientes" element={<Pendientes />} />
            <Route path="registro" element={<RegistroQR />} />
            <Route path="canjeo/:eventId" element={<CanjeoQR />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
