import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../../styles/compraDetallesStyles.css';
import ClientNavbarHome from '../home_init/navbar_home';

const CompraDetalles = () => {
    const location = useLocation();
    const compra = location.state?.compra; // Obtener los datos de la compra desde el estado
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userData && token) {
            setUser(JSON.parse(userData));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Función para descargar el div como imagen
    const downloadQRCodeAsImage = () => {
        const canvas = document.querySelector('.qr-code canvas');
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'ticket_qr.png';
        link.click();
    };

    // Función para descargar el div como PDF
    const downloadQRCodeAsPDF = () => {
        const pdf = new jsPDF();
        const canvas = document.querySelector('.qr-code canvas');
        const image = canvas.toDataURL("image/png");

        pdf.addImage(image, 'PNG', 15, 40, 180, 160); // Ajusta las dimensiones según sea necesario
        pdf.save("ticket_qr.pdf");
    };

    if (!compra) {
        return (
            <div className="no-detalles-compra">
                <p>No se encontraron detalles de la compra</p>
            </div>
        );
    }

    return (
        <div className="detalles-compra-container">
            {/* Navbar */}
            <ClientNavbarHome user={user} onLogout={handleLogout} />
            
            {/* Título */}
            <h1>Detalles de la Compra</h1>
            
            <div className="detalles-compra-content">
                {/* Cart design */}
                <div className="compra-cart">
                    <div className="qr-code">
                        <p><strong>Código del Ticket (QR):</strong></p>
                        <QRCodeCanvas 
                            value={compra.codigo_ticket} 
                            size={256}           // Tamaño del QR
                            bgColor="#ffffff"    // Fondo blanco
                            fgColor="#000000"    // Color del código (negro)
                            includeMargin={true} // Incluir margen alrededor del código
                        />
                         {/* Botones para descargar como imagen o PDF */}
                <button onClick={downloadQRCodeAsImage}>Descargar como Imagen</button>
                <button onClick={downloadQRCodeAsPDF}>Descargar como PDF</button>
                    </div>

                    <div className="detalles-info">
                        <p><strong>Nombre del Evento:</strong> {compra.nombre_evento}</p>
                        <p><strong>Hora de Inicio:</strong> {compra.hora_inicio}</p>
                        <p><strong>Hora de Fin:</strong> {compra.hora_fin}</p>
                        <p><strong>Monto:</strong> {compra.monto}</p>
                        <p><strong>Fecha de Pago:</strong> {new Date(compra.fecha_pago).toLocaleDateString()}</p>
                        <p><strong>Fecha de Inicio:</strong> {new Date(compra.fecha_inicio).toLocaleDateString()}</p>
                        <p><strong>Fecha de Término:</strong> {new Date(compra.fecha_termino).toLocaleDateString()}</p>
                        <p><strong>Ubicación:</strong> {compra.ubicacion}</p>
                        <p><strong>ID del Ticket:</strong> {compra.ticket_id}</p>
                        <p><strong>Información del Ticket:</strong> {compra.info_ticket}</p>
                        <p><strong>Código del Ticket:</strong> {compra.codigo_ticket}</p>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};

export default CompraDetalles;