import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/roles.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const Roles = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios.get(`${API_URL}/roles`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowModal = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
    setNewRoleName('');
  };

  const handleCreateRole = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear este nuevo rol?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crearlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${API_URL}/roles`, { nombre: newRoleName })
          .then(response => {
            setRoles([...roles, response.data]);
            Swal.fire(
              '¡Creado!',
              'El rol ha sido creado.',
              'success'
            );
            handleCloseModal();
          })
          .catch(error => {
            console.error('Error creating role:', error);
          });
      }
    });
  };

  const handleUpdateRole = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este rol?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${API_URL}/roles/${selectedRole.rol_id}`, { nombre: selectedRole.nombre })
          .then(response => {
            setRoles(roles.map(role => role.rol_id === selectedRole.rol_id ? response.data : role));
            Swal.fire(
              '¡Actualizado!',
              'El rol ha sido actualizado.',
              'success'
            );
            handleCloseModal();
          })
          .catch(error => {
            console.error('Error updating role:', error);
          });
      }
    });
  };

  const handleDeleteRole = (rolId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este rol.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/roles/${rolId}`)
          .then(response => {
            setRoles(roles.filter(role => role.rol_id !== rolId));
            Swal.fire(
              '¡Eliminado!',
              'El rol ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting role:', error);
          });
      }
    });
  };

  const handleRoleNameChange = (event) => {
    setSelectedRole({ ...selectedRole, nombre: event.target.value });
  };

  const handleNavigateToPermissions = () => {
    navigate(`/dashboard/permisos/${selectedRole.rol_id}`);
  };

  const filteredRoles = roles.filter(role =>
    role.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Roles</h2>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div>
          <button className="btn btn-primary" onClick={() => handleShowModal(null)}>
            <FaPlus className="mr-2" /> Crear Nuevo Rol
          </button>
        </div>
      </div>

      <div className="roles-container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary">Mostrar de 1 a 10 roles</button>
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Buscar..." 
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map(role => (
                <tr key={role.rol_id}>
                  <td>{role.rol_id}</td>
                  <td>{role.nombre}</td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => handleShowModal(role)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteRole(role.rol_id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-3">
          Mostrando roles de 1 a 10
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedRole ? 'Editar Rol' : 'Crear Rol'}</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nombre del Rol</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={selectedRole ? selectedRole.nombre : newRoleName}
                    onChange={selectedRole ? handleRoleNameChange : (e) => setNewRoleName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {selectedRole && (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleNavigateToPermissions}>
                  Permisos
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateRole}>
                  Actualizar
                </button>
              </div>
            )}
            {!selectedRole && (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateRole}>
                  Crear Rol
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
