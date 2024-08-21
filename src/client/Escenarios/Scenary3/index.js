import React from 'react';
import "../../../styles/style.css";
import Asientos from '../componentes/Asientos'

function dividirArray(arr, numPartes) {
  const n = arr.length;
  const parteTamaño = Math.floor(n / numPartes);
  const resto = n % numPartes;

  const partes = [];

  // Distribuir las partes base
  for (let i = 0; i < numPartes; i++) {
      partes.push(arr.slice(i * parteTamaño, (i + 1) * parteTamaño));
  }

  // Distribuir el residuo entre las primeras partes
  for (let i = 0; i < resto; i++) {
      partes[i].push(arr[numPartes * parteTamaño + i]);
  }

  return partes;
}

const Escenario3 = ({data, setSelectedSeats}) => {
  const seatsLeft = [
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [0],
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [1],
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [2],
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [3],
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [4],
    dividirArray(dividirArray(data.asientos, 3)[0], 6) [5]
  ];
  const seatsRight = [
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [0],
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [1],
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [2],
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [3],
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [4],
    dividirArray(dividirArray(data.asientos, 3)[1], 6) [5]
  ];
  const seats = dividirArray(data.asientos, 3)[2];


  
  
  
  return (
    <div className="stage-container">

      <div style={{height:"15px", backgroundColor: "#6D3089", width: "650px" }}></div>
      
      <div class="row-flex">
        <div style={{width: "300px", textAlign: "right"}}>
          {seatsLeft.map((seatrow, rowIndex) => (
            <div style={{ marginRight: `${-14 * rowIndex}px` }} key={rowIndex}>
              {seatrow.map((seat) => (
                <Asientos number={seat.numero_asiento.split("-")[1]} status={seat.estado} key={seat.asiento_id} id={seat.asiento_id} setSelectedSeats={setSelectedSeats}/>
              ))}
            </div>
          ))}
        </div>
        
        <div class="trapecio"></div>

        <div style={{width: "300px", textAlign: "left"}}>
          {seatsRight.map((seatrow, rowIndex) => (
            <div style={{ marginLeft: `${-14 * rowIndex}px` }} key={rowIndex}>
              {seatrow.map((seat) => (
                <Asientos number={seat.numero_asiento.split("-")[1]} status={seat.estado} key={seat.asiento_id} id={seat.asiento_id} setSelectedSeats={setSelectedSeats}/>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div class="seatscenter">
        {seats.map(seatId => (
            <Asientos number={seatId.numero_asiento.split("-")[1]} status={seatId.estado} key={seatId.asiento_id} id={seatId.asiento_id} setSelectedSeats={setSelectedSeats}/>
        ))}
      </div>

    </div>
  );
}





export default Escenario3;