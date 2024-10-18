import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/newStyles.css';
import ClientNavbarHome from '../home_init/navbar_home';

const HistorialCompra = () => {
    const [compras, setCompras] = useState([]); // Estado para almacenar las compras
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token"); // Obtener el token de localStorage

        if (userData && token) {
            setUser(JSON.parse(userData));  // Almacenar el usuario en el estado
            fetchCompras(token); // Llamar a la función para obtener las compras
        } else {
            navigate("/login");  // Redirigir al login si no hay datos del usuario o token
        }
    }, [navigate]);

    const fetchCompras = async (token) => {
        try {
            const response = await fetch('http://localhost:4000/api/payment/history/detailed', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCompras(data); // Guardar las compras en el estado
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

    return (
        <div>
            <ClientNavbarHome user={user} onLogout={handleLogout} />
            <hr/><br/><br/>
            <div style={{ padding: '30px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '2em', fontWeight: 'bold' }}>
                    Historial de Compras
                </h1>
                
                {/* Mostrar las compras */}
                <div>
                    {compras.length > 0 ? (
                        <ul>
                            {compras.map((compra) => (
                                <li key={compra.pago_id}>
                                    <p><strong>ID Pago:</strong> {compra.pago_id}</p>
                                    <p><strong>Monto:</strong> {compra.monto}</p>
                                    <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
                                    <p><strong>ID Evento:</strong> {compra.evento_id}</p>
                                    <p><strong>ID Usuario:</strong> {compra.usuario_id}</p>
                                    
                                    

                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay compras disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistorialCompra;
