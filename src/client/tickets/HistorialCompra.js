import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/historialcomprastyles.css';
import ClientNavbarHome from '../home_init/navbar_home';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || 'https://api-digital.fly.dev/api';

const HistorialCompra = () => {
    const [compras, setCompras] = useState([]);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUser({ id: decodedToken.id, rol: decodedToken.rol });
        if (token) {
            fetchCompras(token);
        } else {
            navigate("/login");
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

    const fetchCompras = async (token) => {
        try {
            const response = await fetch(`${API_URL}/payment/history/detailed`, {
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
        navigate("/login");
    };

    const manejarClickCompra = (compra) => {
        // Redirigir a la página de detalles con los datos de la compra
        navigate(`/compra/${compra.pago_id}`, { state: { compra } });
    };

    return (
        <div className="historial-container">
            <ClientNavbarHome user={userId} onLogout={handleLogout} />
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