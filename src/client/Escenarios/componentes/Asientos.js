import React, { useState } from "react";
import "../../../style.css";

const Asientos = ({ id, status, setSelectedSeats  = undefined, number=0 }) => {

    const [estado, setEstado] = useState(status);

    const handleClick = () => {
        if(estado === 'Seleccionado'){
            setEstado('Disponible');
            setSelectedSeats((prevSelectedSeats) => {
                const updatedSelectedSeats = prevSelectedSeats.filter((item) => item !== id);
                return updatedSelectedSeats;
            });
        }
        if(estado === 'Disponible'){
            setEstado('Seleccionado');
            setSelectedSeats((prevSelectedSeats) => {
                const updatedSelectedSeats = [...prevSelectedSeats];
                updatedSelectedSeats.push(id)
                return updatedSelectedSeats;
            });
        }
    };

    return (
        <div
            className={`seat ${estado}`}
            onClick={handleClick}
        >
            {/* {id} */}
            <span className="seat-id">{number}</span>
        </div>
        // <p>Icono de café: <i className="fa-regular fa-user"></i></p>
    );
}

export default Asientos;