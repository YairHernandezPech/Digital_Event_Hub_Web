import React from 'react';
import Asientos from '../componentes/Asientos';
import "../../../styles/style.css";

const Escenario1 = ({ data, setSelectedSeats }) => {
    const seats = data.asientos;

    return (
        <div className="main-container">
            <div className='left-aligned-container'>
                <div className="stage-container">
                    <div className="stage">
                        <div className="top-rect"></div>
                        <div className="line left1"></div>
                        <div className="line left2"></div>
                        <div className="line left3"></div>
                        <div className="line right1"></div>
                        <div className="line right2"></div>
                        <div className="line right3"></div>
                        <div className="square_left"></div>
                        <div className="square2_left"></div>
                        <div className="square3_left"></div>
                        <div className="square_right"></div>
                        <div className="square2_right"></div>
                        <div className="square3_right"></div>
                        <div className="base-line"></div>
                        <div className="bottom-rect"></div>
                    </div>
                    <div className="seats-container">
                        {seats.map(seat => (
                            <Asientos
                                key={seat.asiento_id}
                                id={seat.asiento_id}
                                number={seat.numero_asiento.split("-")[1]}
                                status={seat.estado}
                                setSelectedSeats={setSelectedSeats}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Escenario1;
