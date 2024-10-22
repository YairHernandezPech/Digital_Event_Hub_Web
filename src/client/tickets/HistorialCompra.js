import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/historialcomprastyles.css';
import ClientNavbarHome from '../home_init/navbar_home';


const HistorialCompra = () => {
    const [compras, setCompras] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userData && token) {
            setUser(JSON.parse(userData));
            fetchCompras(token);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const fetchCompras = async (token) => {
        try {
            const response = await fetch('http://localhost:4000/api/payment/history/detailed', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCompras(data);
            } else {
                console.error('Error al obtener el historial de compras');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const manejarClickCompra = (compra) => {
        // Redirigir a la página de detalles con los datos de la compra
        navigate(`/compra/${compra.pago_id}`, { state: { compra } });
    };

    return (
        <div className="historial-container">
            <ClientNavbarHome user={user} onLogout={handleLogout} />
            <h1 className="historial-title">Historial de Compras</h1>
            
            <div>
                {compras.length > 0 ? (
                    <ul className="compras-list">
                        {compras.map((compra) => (
                            <li key={compra.pago_id} className="compra-card" onClick={() => manejarClickCompra(compra)}>
                                <div className="compra-info">
                                    <h2 className="compra-titulo">{compra.nombre_evento}</h2>
                                    <p><strong>Fecha de Inicio:</strong> {new Date(compra.fecha_inicio).toLocaleDateString()}</p>
                                    <p><strong>Fecha de Término:</strong> {new Date(compra.fecha_termino).toLocaleDateString()}</p>
                                    <p><strong>Ubicación:</strong> {compra.ubicacion}</p>
                                    <p className="monto-texto"><strong>Monto: ${compra.monto}</strong></p>
                                </div>
                                <div className="compra-monto">
                                    <p className="monto-texto"><strong>Monto: ${compra.monto}</strong></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-compras">No hay compras disponibles</p>
                )}
            </div>
        </div>
    );
};

export default HistorialCompra;