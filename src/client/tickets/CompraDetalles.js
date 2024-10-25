import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../../styles/compraDetallesStyles.css';
import ClientNavbarHome from '../home_init/navbar_home';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Button } from '@mui/material';  // Importa el botón de Material-UI

const API_URL = process.env.REACT_APP_API_URL || 'https://api-digital.fly.dev/api';

const CompraDetalles = () => {
    const location = useLocation();
    const compra = location.state?.compra; // Obtener los datos de la compra desde el estado
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("token");
        if (userData) {
            const decodedToken = jwtDecode(userData);
            setUser({ id: decodedToken.id, rol: decodedToken.rol });
        } else {
            navigate("/login"); // Redirige al login si no hay datos del usuario
        }
    }, [navigate]);

    useEffect(() => {
        if (user && user.id) {
            axios.get(`${API_URL}/users/${user.id}`)
                .then(response => {
                    setUserId(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("token");
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
            <ClientNavbarHome user={userId} onLogout={handleLogout} />

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
                        <Button
                            variant="contained"
                            onClick={downloadQRCodeAsImage}
                            sx={{
                                backgroundColor: '#a569bd',
                                color: 'white',  // Color del texto
                                margin: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#8e44ad'  // Color al pasar el ratón
                                }
                            }}
                        >
                            Descargar como Imagen
                        </Button>

                        <Button
                            variant="contained"
                            onClick={downloadQRCodeAsPDF}
                            sx={{
                                backgroundColor: '#6c3483',
                                color: 'white',
                                margin: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#512e5f'
                                }
                            }}
                        >
                            Descargar como PDF
                        </Button>

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
