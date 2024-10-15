import React, { useState, useEffect } from 'react';
import '../styles/membresias.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event.onrender.com/api';

const Membresias = () => {
  const [memberships, setMemberships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMembership, setNewMembership] = useState({ tipo: '', descripcion: '', costo: 0 });
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/membresias`)
      .then(response => {
        setMemberships(response.data.filter(membership => membership.tipo !== 'Defecto'));
      })
      .catch(error => {
        console.error('Error fetching memberships:', error);
      });
  }, []);

  const handleShowModal = (membership) => {
    setSelectedMembership(membership);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMembership(null);
    setNewMembership({ tipo: '', descripcion: '', costo: 0 });
  };

  const handleCreateMembership = () => {
    axios.post(`${API_URL}/membresias`, newMembership)
      .then(response => {
        setMemberships([...memberships, { ...newMembership, membresia_id: Date.now() }]);
        Swal.fire('Membresía creada', 'La membresía se ha creado exitosamente', 'success');
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error creating membership:', error);
      });
  };

  const handleUpdateMembership = () => {
    axios.put(`${API_URL}/membresias/${selectedMembership.membresia_id}`, selectedMembership)
      .then(response => {
        setMemberships(memberships.map(m => m.membresia_id === selectedMembership.membresia_id ? selectedMembership : m));
        Swal.fire('Membresía actualizada', 'La membresía se ha actualizado exitosamente', 'success');
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error updating membership:', error);
      });
  };

  const handleDeleteMembership = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/membresias/${id}`)
          .then(response => {
            setMemberships(memberships.filter(m => m.membresia_id !== id));
            Swal.fire('Eliminada', 'La membresía ha sido eliminada.', 'success');
          })
          .catch(error => {
            console.error('Error deleting membership:', error);
          });
      }
    });
  };

  const handleMembershipChange = (event) => {
    const { name, value } = event.target;
    setSelectedMembership({ ...selectedMembership, [name]: value });
  };

  const handleNewMembershipChange = (event) => {
    const { name, value } = event.target;
    setNewMembership({ ...newMembership, [name]: value });
  };

  return (
    <div className="page-background">
      <h1 className="page-title">Membresías</h1>
      <div>
          <button className="btn btn-primary mr-2" onClick={() => handleShowModal(null)}>
            Crear Nueva Membresía
          </button>
        </div>
      <div className="container">
        <div className="cardss-container">
          {memberships.map((membership) => (
            <div className="membership-cards" key={membership.membresia_id}>
              <h3 className="membership-title">{membership.tipo}</h3>
              <p className="membership-description">{membership.descripcion}</p>
              <p className="membership-price">${parseFloat(membership.costo).toFixed(2)}</p>
              <button className="btn btn-primary mr-2" onClick={() => handleShowModal(membership)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDeleteMembership(membership.membresia_id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedMembership ? 'Editar Membresía' : 'Crear Membresía'}</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Tipo de Membresía</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="tipo"
                    value={selectedMembership ? selectedMembership.tipo : newMembership.tipo}
                    onChange={selectedMembership ? handleMembershipChange : handleNewMembershipChange}
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="descripcion"
                    value={selectedMembership ? selectedMembership.descripcion : newMembership.descripcion}
                    onChange={selectedMembership ? handleMembershipChange : handleNewMembershipChange}
                  />
                </div>
                <div className="form-group">
                  <label>Costo</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="costo"
                    value={selectedMembership ? selectedMembership.costo : newMembership.costo}
                    onChange={selectedMembership ? handleMembershipChange : handleNewMembershipChange}
                    step="0.01"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
              {selectedMembership ? (
                <button type="button" className="btn btn-primary" onClick={handleUpdateMembership}>Actualizar</button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleCreateMembership}>Crear</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membresias;
