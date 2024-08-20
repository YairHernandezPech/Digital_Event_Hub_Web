import React, { useState, useEffect } from 'react';
import '../styles/usuarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const Usuarios = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: '',
    last_name: '',
    email: '',
    contrasena: '',
    telefono: '',
    rol_id: '',
    membresia_id: '',
    activo: 'Activo'
  });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${API_URL}/users`)
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre && typeof usuario.nombre === 'string'
      ? usuario.nombre.toLowerCase().includes(search.toLowerCase())
      : false
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUserId(null);
    setNewUser({
      nombre: '',
      last_name: '',
      email: '',
      contrasena: '',
      telefono: '',
      rol_id: '',
      membresia_id: '',
      activo: 'Activo'
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateUser = () => {
    const userToCreate = {
      ...newUser,
      activo: newUser.activo === 'Activo' ? 1 : 0 // Convertir 'Activo' a 1 y 'Inactivo' a 0
    };
  
    axios.post(`${API_URL}/register`, userToCreate)
      .then(response => {
        setUsuarios([...usuarios, response.data]);
        handleCloseModal(); // Reemplazamos setShowModal(false) con handleCloseModal
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario se ha creado exitosamente.'
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setNewUser({
      nombre: user.nombre,
      email: user.email,
      contrasena: '',
      telefono: user.telefono,
      rol_id: user.rol_id.toString(),
      membresia_id: user.membresia_id.toString(),
      activo: 'Activo'
    });
    setShowModal(true);
  };

  const handleUpdateUser = () => {
    axios.put(`${API_URL}/users/${editUserId}`, newUser)
      .then(response => {
        const updatedUsers = usuarios.map(user => (
          user.id === editUserId ? { ...user, ...newUser } : user
        ));
        setUsuarios(updatedUsers);
        setShowModal(false);
        setEditUserId(null);
        setNewUser({
          name: '',
          email: '',
          password: '',
          phone: '',
          role_id: '',
          membresia_id: '',
          activo: 'Activo'
        });
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'El usuario se ha actualizado exitosamente.'
        });
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/users/${userId}`)
          .then(response => {
            const filteredUsers = usuarios.filter(user => user.id !== userId);
            setUsuarios(filteredUsers);
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      }
    });
  };

  const getRoleName = (roleId) => {
    switch(roleId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      case 3:
        return 'Organizador';
      default:
        return 'Desconocido';
    }
  };

  const getMembresia = (membresiaId) => {
    switch(membresiaId) {
      case 1:
        return 'Basico';
      case 2:
        return 'Plus';
      case 3:
        return 'Profesional';
      case 4:
        return 'Defecto';
      default:
        return 'Sin asignar';
    }
  };

  return (
    <div className='fondo'>
      <div className="container">
        <div className="contenedor-tablas">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-secondary">Mostrar de 1 a 10 usuarios</button>
            <input 
              type="text" 
              className="form-control search-input" 
              placeholder="Buscar..." 
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="car text-center mt-4">
            <div className="car-header">
              Lista de Usuarios
              <button className="btn btn-primary float-right" onClick={handleShowModal}>
                <FaUserPlus className="mr-2" /> Crear Nuevo Usuario
              </button>
            </div>
            <div className="car-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Número</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Membresía</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.map(usuario => (
                    <tr key={usuario.usuario_id}>
                      <td>{usuario.usuario_id}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.last_name}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.telefono}</td>
                      <td>{getRoleName(usuario.rol_id)}</td>
                      <td>{getMembresia(usuario.membresia_id)}</td>
                      <td>{usuario.activo ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <button className="btn btn-primary mr-2" onClick={() => handleEditUser(usuario)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(usuario.usuario_id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-3">
            Mostrando usuarios de 1 a 10
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editUserId ? 'Editar Usuario' : 'Crear Usuario'}</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={newUser.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input type="text" className="form-control" name="last_name" value={newUser.last_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="password" className="form-control" name="contrasena" value={newUser.contrasena} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="text" className="form-control" name="telefono" value={newUser.telefono} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select className="form-control" name="rol_id" value={newUser.rol_id} onChange={handleChange}>
                    <option value="">Seleccione un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                    <option value="3">Organizador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Membresía</label>
                  <select className="form-control" name="membresia_id" value={newUser.membresia_id} onChange={handleChange}>
                    <option value="">Seleccione una membresía</option>
                    <option value="1">Básico</option>
                    <option value="2">Plus</option>
                    <option value="3">Profesional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select className="form-control" name="activo" value={newUser.activo} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
              {editUserId ? (
                <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>Actualizar</button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleCreateUser}>Crear</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
