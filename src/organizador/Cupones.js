import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import '../styles/cupones.css';

const Cupones = () => {
  const [cupones, setCupones] = useState([]);
  const [existingCupones, setExistingCupones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [showExisting, setShowExisting] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/cupon/all-coupons')
      .then(response => {
        setExistingCupones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener cupones existentes:', error);
      });
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const nuevosCupones = jsonData.map((item, index) => ({
        id: cupones.length + index + 1,
        info: item.Nombre || item.nombre || 'Nombre no especificado',
        fecha_creacion: item.FechaCreacion || item.fechaCreacion || 'Fecha no especificada',
        status: item.Estado || item.estado !== undefined ? Number(item.Estado || item.estado) : 1,
        code: item.Codigo || item.codigo || 'Código no especificado',
        redeem: item.Redeem !== undefined ? Boolean(item.Redeem) : false, // Asignar valor de redeem
      }));

      setCupones(nuevosCupones);
      setShowExisting(false); // Ocultar los cupones existentes al importar
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExportAndSave = () => {
    if (cupones.length > 0) {
      axios.post('http://localhost:4000/api/cupon/upload-coupons', cupones)
        .then(response => {
          console.log('Cupones guardados en la base de datos:', response.data);
          alert('Cupones guardados exitosamente');
          setCupones([]); // Limpiar cupones importados después de guardar
          setShowExisting(true); // Restaurar visibilidad de cupones existentes
        })
        .catch(error => {
          console.error('Error al guardar cupones en la base de datos:', error);
        });
    } else {
      alert('No hay datos para exportar');
    }
  };

  const handleExport = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cupones-container">
      <div className="cupones-header">
        <button className="export-button" onClick={handleExport}>
          Exportar Excel
        </button>
        <button
          className="import-button"
          onClick={() => fileInputRef.current.click()}
        >
          Importar Excel
        </button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <div className="coupons-counter">
          <span>{cupones.length}/50 Cupones</span>
        </div>
      </div>

      <div className="cupones-create">
        <h3>Crear Cupones</h3>
        <div className="filters">
          <label htmlFor="start">Fecha de Inicio:</label>
          <input type="date" id="start" name="start" />
          <label htmlFor="end">Fecha de Fin:</label>
          <input type="date" id="end" name="end" />
          <button className="create-coupon-button">Crear Cupon</button>
        </div>
      </div>

      <div className="cupones-list">
        <table>
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Info</th>
              <th>Fecha de Creación</th>
              <th>Estado</th>
              <th>Código</th>
              <th>Redeem</th> {/* Nueva columna para redeem */}
            </tr>
          </thead>
          <tbody>
            {showExisting ? existingCupones.map((cupon) => (
              <tr key={cupon.ticket_id}>
                <td>{cupon.ticket_id}</td>
                <td>{cupon.info}</td>
                <td>{cupon.fecha_creacion}</td>
                <td>{cupon.status}</td>
                <td>{cupon.code}</td>
                <td>{cupon.redeem ? 'Sí' : 'No'}</td> {/* Mostrar estado de redeem */}
              </tr>
            )) : cupones.map((cupon, index) => (
              <tr key={index}>
                <td>{cupon.id}</td>
                <td>{cupon.info}</td>
                <td>{cupon.fecha_creacion}</td>
                <td>{cupon.status}</td>
                <td>{cupon.code}</td>
                <td>{cupon.redeem ? 'Sí' : 'No'}</td> {/* Mostrar estado de redeem */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Vista previa de la tabla</h4>
            <table>
              <thead>
                <tr>
                  <th>Ticket Id</th>
                  <th>Nombre</th>
                  <th>Fecha de Creación</th>
                  <th>Estado</th>
                  <th>Código del Cupón</th>
                  <th>Redeem</th> {/* Nueva columna para redeem */}
                </tr>
              </thead>
              <tbody>
                {cupones.map((cupon, index) => (
                  <tr key={index}>
                    <td>{cupon.id}</td>
                    <td>{cupon.info}</td>
                    <td>{cupon.fecha_creacion}</td>
                    <td>{cupon.status}</td>
                    <td>{cupon.code}</td>
                    <td>{cupon.redeem ? 'Sí' : 'No'}</td> {/* Mostrar estado de redeem */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-actions">
              <button className="modal-button" onClick={handleExportAndSave}>Sí, guardar</button>
              <button className="modal-button" onClick={handleCloseModal}>No, cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cupones;
