import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/newStyles.css'
import ClientNavbarHome from '../home_init/navbar_home';
const HistorialCompra = () => {
    //const [compras, setCompras] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
          setUser(JSON.parse(userData));  // Almacena el usuario en el estado
      } else {
          navigate("/login");  // Redirige al login si no hay datos del usuario
      }
  }, [navigate]);
    

    
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
            
            </div>
        </div>
    );
};

export default HistorialCompra;
