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


const Escenario4 = ({data, setSelectedSeats}) => {
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

      <div style={{height:"15px", backgroundColor: "#6D3089", width: "600px" }}></div>
      
      <div class="row-flex">
        <div style={{width: "300px", textAlign: "right"}}>
          {seatsLeft.map((seatrow, rowIndex) => (
            <div key={rowIndex}>
              {seatrow.map((seat) => (
                <Asientos number={seat.numero_asiento.split("-")[1]} status={seat.estado} key={seat.asiento_id} id={seat.asiento_id} setSelectedSeats={setSelectedSeats}/>
              ))}
            </div>
          ))}
        </div>
        
        <div class="scenario-square" style={{height: "318px"}}></div>

        <div style={{width: "300px", textAlign: "left"}}>
          {seatsRight.map((seatrow, rowIndex) => (
            <div key={rowIndex}>
              {seatrow.map((seat) => (
                <Asientos number={seat.numero_asiento.split("-")[1]} status={seat.estado} key={seat.asiento_id} id={seat.asiento_id} setSelectedSeats={setSelectedSeats}/>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div class="seatscenter4">
        {seats.map(seatId => (
          <Asientos number={seatId.numero_asiento.split("-")[1]} status={seatId.estado} key={seatId.asiento_id} id={seatId.asiento_id} setSelectedSeats={setSelectedSeats}/>
        ))}
      </div>

    </div>
  );
}

// const Escenario4 = () => {

//   const  [loading, setLoading] = useState(true)
//   const  [data, setData] = useState();
//   const [selectedSeats, setSelectedSeats] = useState([])

//   const getData = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get(
//         `http://localhost:4001/api/v1/escenarios/3`
//       );
//       setData(response.data)
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false)
//     }
//   };

//   const handleSubmit = async () => {
//     selectedSeats.map(async id => {
//       try {
//         const response = await axios.put(
//           `http://localhost:4001/api/v1/asientos/${id}`, 
//           { estado: "Ocupado" }
//         );
//         getData()
//       } catch (err) {
//         console.log(err);
//       } finally {
//         console.log("GG");
//       }
//     })
//   };


//   useEffect(()=>{
//     getData()
//   },[])
  
//   return (
//     <Fragment>
//       <Header />
//       <div className="main-container">
//         <div className="content-container">
//           <div className="left-column" style={{display: "flex"}}>
//           { !loading && 
//               <Escenario data={data} setSelectedSeats={setSelectedSeats}/>
//             }
//           </div>
//           <div className="right-column">
//             <Symbology/>
//           </div>
//         </div>
//       </div>
//       <button type="button" class="btn b-rigth"  style={{transform: 'translateY(20%)'}} onClick={handleSubmit}>Continuar</button>
//     </Fragment>
//   );
// }



export default Escenario4;