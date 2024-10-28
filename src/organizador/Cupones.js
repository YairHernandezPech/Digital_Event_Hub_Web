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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('info'); // Nuevo estado para el campo de búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const cuponesPerPage = 30;

  useEffect(() => {
    axios.get('https://api-digital.fly.dev/api/cupon/all-coupons')
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
        redeem: item.Redeem !== undefined ? Boolean(item.Redeem) : false,
      }));
      setCupones(nuevosCupones);
      setShowExisting(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExportAndSave = () => {
    if (cupones.length > 0) {
      axios.post('http://localhost:4000/api/cupon/upload-coupons', cupones)
        .then(response => {
          console.log('Cupones guardados en la base de datos:', response.data);
          alert('Cupones guardados exitosamente');
          setCupones([]);
          setShowExisting(true);
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

  const filteredCupones = (showExisting ? existingCupones : cupones)
    .filter(cupon =>
      cupon[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.redeem - a.redeem); // Ordena para que los canjeados estén primero

  const indexOfLastCupon = currentPage * cuponesPerPage;
  const indexOfFirstCupon = indexOfLastCupon - cuponesPerPage;
  const currentCupones = filteredCupones.slice(indexOfFirstCupon, indexOfLastCupon);
  const totalPages = Math.ceil(filteredCupones.length / cuponesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const redeemedCuponesCount = (showExisting ? existingCupones : cupones).filter(cupon => cupon.redeem).length;

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
          <span>{redeemedCuponesCount}/ 350 Cupones canjeados</span>
        </div>
        
        {/* Selector de campo de búsqueda */}
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="search-select"
        >
          <option value="info">Buscar por Info</option>
          <option value="code">Buscar por Código</option>
        </select>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder={`Buscar por ${searchField === 'info' ? 'info' : 'código'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cupones-list">
        <table>
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Info</th>
              <th>Estado</th>
              <th>Código del cupon</th>
              <th>Canjeado</th>
              <th>Canjeado por</th>
            </tr>
          </thead>
          <tbody>
            {currentCupones.map((cupon, index) => (
              <tr key={cupon.ticket_id || index}>
                <td>{cupon.ticket_id || cupon.id}</td>
                <td>{cupon.info}</td>
                <td>{cupon.status === 1 ? 'Ya entró al evento' : 'No ha entrado'}</td>
                <td>{cupon.code}</td>
                <td>{cupon.redeem ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
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
                  <th>Canjeado</th>
                </tr>
              </thead>
              <tbody>
                {cupones.map((cupon, index) => (
                  <tr key={index}>
                    <td>{cupon.id}</td>
                    <td>{cupon.info}</td>
                    <td>{cupon.fecha_creacion}</td>
                    <td>{cupon.status}</td>
                    <td>{cupon.redeem ? 'Sí' : 'No'}</td>
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
