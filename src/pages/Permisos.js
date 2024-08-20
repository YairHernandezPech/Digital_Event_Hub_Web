import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/permisos.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const Permisos = () => {
  const { roleId } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleTitle, setRoleTitle] = useState('');

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`${API_URL}/roles/${roleId}/permissions`);
        setPermissions(response.data.permissions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setLoading(false);
      }
    };

    const fetchRoleTitle = async () => {
      try {
        const response = await axios.get(`${API_URL}/roles/${roleId}`);
        setRoleTitle(getRoleTitle(response.data.role_name));
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchPermissions();
    fetchRoleTitle();
  }, [roleId]);

  const getRoleTitle = (roleName) => {
    switch (roleName) {
      case 'admin':
        return '1. Permisos de Administrador';
      case 'organizador':
        return '2. Permisos de Organizador';
      case 'cliente':
        return '3. Permisos de Cliente';
      default:
        return '';
    }
  };

  const toggleButton = (id, action) => {
    setPermissions(prevPermissions => 
      prevPermissions.map(permission => 
        permission.permiso_id === id 
          ? { ...permission, [action]: !permission[action] } 
          : permission
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Permisos del Rol</h1>
      <h2>{roleTitle}</h2>
      <table>
        <thead>
          <tr>
            <th>Permiso</th>
            <th>Ver</th>
            <th>Crear</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map(permission => (
            <tr key={permission.permiso_id}>
              <td>{permission.nombre}</td>
              <td>
                <button
                  onClick={() => toggleButton(permission.permiso_id, 'view')}
                  className={permission.view ? 'btn-on' : 'btn-off'}
                >
                  {permission.view ? 'On' : 'Off'}
                </button>
              </td>
              <td>
                <button
                  onClick={() => toggleButton(permission.permiso_id, 'create')}
                  className={permission.create ? 'btn-on' : 'btn-off'}
                >
                  {permission.create ? 'On' : 'Off'}
                </button>
              </td>
              <td>
                <button
                  onClick={() => toggleButton(permission.permiso_id, 'edit')}
                  className={permission.edit ? 'btn-on' : 'btn-off'}
                >
                  {permission.edit ? 'On' : 'Off'}
                </button>
              </td>
              <td>
                <button
                  onClick={() => toggleButton(permission.permiso_id, 'delete')}
                  className={permission.delete ? 'btn-on' : 'btn-off'}
                >
                  {permission.delete ? 'On' : 'Off'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permisos;
