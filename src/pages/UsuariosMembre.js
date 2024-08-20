import React, { useState, useEffect } from 'react';
import '../styles/usuariosMembre.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const getMembresiaClass = (membresia) => {
  switch (membresia) {
    case 'Básico':
      return 'membresia-basico';
    case 'Plus':
      return 'membresia-plus';
    case 'Profesional':
      return 'membresia-profesional';
    default:
      return '';
  }
};

const UsuarioMembre = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    const basicoPromise = axios.get(`${API_URL}/users/membresia/1`);
    const plusPromise = axios.get(`${API_URL}/users/membresia/2`);
    const profesionalPromise = axios.get(`${API_URL}/users/membresia/3`);

    Promise.all([basicoPromise, plusPromise, profesionalPromise])
      .then(([basicoResponse, plusResponse, profesionalResponse]) => {
        const basicoUsuarios = basicoResponse.data.map(user => ({ ...user, membresia: 'Básico' }));
        const plusUsuarios = plusResponse.data.map(user => ({ ...user, membresia: 'Plus' }));
        const profesionalUsuarios = profesionalResponse.data.map(user => ({ ...user, membresia: 'Profesional' }));

        setUsuarios([...basicoUsuarios, ...plusUsuarios, ...profesionalUsuarios]);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Usuarios con Membresías</h2>
      <div className="contenedor-tablas">
        <div className="cart text-center mt-4">
          <div className="cart-header">
            Lista de Usuarios con Membresías
          </div>
          <div className="cart-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Membresía</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.usuario_id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>
                      <div className={`membresia-card ${getMembresiaClass(usuario.membresia)}`}>
                        {usuario.membresia}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioMembre;
