import React from 'react';
import "../../../style.css";
import Asientos from '../componentes/Asientos';

const Escenario2 = () => {
  const totalSeats = 140; // Número total de asientos
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  
  const seatsLeft = seats.slice(0, 18);
  const seatsRight = seats.slice(18, 36);
  const seatsCenter = seats.slice(36);
  
  const halfSeatsCenter = Math.ceil(seatsCenter.length / 2);
  const seatsCenterTop = seatsCenter.slice(0, halfSeatsCenter);
  const seatsCenterBottom = seatsCenter.slice(halfSeatsCenter);
  
  const createRows = (seats, seatsPerRow) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += seatsPerRow) {
      rows.push(seats.slice(i, i + seatsPerRow));
    }
    return rows;
  };
  
  const rowsLeft = createRows(seatsLeft, 3);
  const rowsRight = createRows(seatsRight, 3);
  
  return (
    <div className="stage-container">
      <div className="seatscenter2">
        {seatsCenterTop.map((seatId) => (
          <Asientos key={seatId} id={seatId} />
        ))}
      </div>
  
      <div className="row-flex">
        <div style={{ width: "300px", textAlign: "right" }}>
          {rowsLeft.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((seatId) => (
                <Asientos key={seatId} id={seatId} />
              ))}
            </div>
          ))}
        </div>
  
        <div className="scenario-square"></div>
  
        <div style={{ width: "300px", textAlign: "left" }}>
          {rowsRight.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((seatId) => (
                <Asientos key={seatId} id={seatId} />
              ))}
            </div>
          ))}
        </div>
      </div>
  
      <div className="seatscenter4">
        {seatsCenterBottom.map((seatId) => (
          <Asientos key={seatId} id={seatId} />
        ))}
      </div>
    </div>
  );
}

export default Escenario2;
