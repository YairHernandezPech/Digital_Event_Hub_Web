import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Roles from '../pages/Roles';
import Usuarios from '../pages/Usuarios';
import Permisos from '../pages/Permisos';
import HomeAdmin from '../admin/homeAdmin';
import HomeOrga from '../organizador/homeOrga';
import '../styles/mainContent.css';

const MainContent = ({ rol }) => {
  const renderHomePage = () => {
    switch (rol.toString()) {
      case '1':
        return <HomeAdmin />;
      case '3':
        return <HomeOrga />;
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/dashboard/roles" element={<Roles />} />
        <Route path="/dashboard/usuarios" element={<Usuarios />} />
        <Route path="/dashboard/permisos" element={<Permisos />} />
      </Routes>
    </div>
  );
};

export default MainContent;
