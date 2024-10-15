import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../styles/cupones.css';

const Cupones = () => {
  const [cupones, setCupones] = useState([
    { id: 1, nombre: 'Mittie Saunders', fechaCreacion: '03/01/2018', estado: 'Redimido', codigo: '89ediwjhed98rj923e23' },
    { id: 2, nombre: 'Elnora Hines', fechaCreacion: '09/10/2018', estado: 'Redimido', codigo: 'dijhwehd98rj923e23769' },
    { id: 3, nombre: 'Pauline Morris', fechaCreacion: '11/18/2018', estado: 'Redimido', codigo: '46189ediyhwehd' },
    { id: 4, nombre: 'Ralph Houston', fechaCreacion: '01/22/2018', estado: 'Redimido', codigo: '9333sedijwehd' },
    { id: 5, nombre: 'Theodore Cohen', fechaCreacion: '05/06/2018', estado: 'Redimido', codigo: 'kxj89r923rj923e23769' },
    // Cupones creados manualmente
  ]);

  const fileInputRef = useRef(null);

  // Boton para importar excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setCupones(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Boton para crear el excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(cupones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cupones');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'cupones.xlsx');
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
          Importar a Excel
        </button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <div className="coupons-counter">
          <span>44/50 Cupones Restantes</span>
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
              <th>Nombre</th>
              <th>Fecha de Creación</th>
              <th>Estado</th>
              <th>Código del Cupón</th>
            </tr>
          </thead>
          <tbody>
            {cupones.map((cupon, index) => (
              <tr key={index}>
                <td>{cupon.nombre || cupon.Nombre}</td>
                <td>{cupon.fechaCreacion || cupon.FechaCreacion}</td>
                <td>{cupon.estado || cupon.Estado}</td>
                <td>{cupon.codigo || cupon.Codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cupones;
