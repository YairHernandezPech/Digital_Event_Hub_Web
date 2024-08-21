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

const Dashboard = ({ role, onLogout }) => {
  let match = useMatch('/dashboard/*');

  if (!role) {
    return <Navigate to="/login" />;
  }

  const user = {};

  return (
    <div>
      <Navbar user={user} />
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%', marginTop: '70px' }}>
        <Sidebar onLogout={onLogout} role={role} />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MainContent role={role} user={user} />} />
            <Route path="roles" element={<Roles />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="permisos/:roleId" element={<Permisos />} />
            <Route path="membresias" element={<Membresias />} />
            <Route path="usuariosMembre" element={<UsuarioMembre/>} />
            <Route path="membresia" element={<Membresia />} />
            <Route path="formulario" element={<Formulario/>} />
            <Route path="updateEvent/:evento_id" element={<UpdateEvent/>} />
            <Route path="aprobados" element={<Aprobados/>} />
            <Route path="desaprobados" element={<Desaprobados/>} />
            <Route path="pendientes" element={<Pendientes/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
