import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "../../../styles/style.css";
import Symbology from './symbology'
import Header from './header'
import Escenario1 from '../Scenary1/Index'
import Escenario3 from '../Scenary3'
import Escenario4 from '../Scenary4'
import axios from 'axios';
import { Fab } from '@mui/material';

const Escenarios = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [eventData, setEventData] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api-digitalevent.onrender.com/api/escenarios/${id}`
            );
            setData(response.data);

            const eventsResponse = await axios.get(
                `https://api-digitalevent.onrender.com/api/events/get/approved`
            );

            const matchedEvent = eventsResponse.data.find(event => event.evento_id === response.data.evento_id);
            setEventData(matchedEvent);

            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let usuarioId = user?.usuario_id;
        console.log(`Este es el usuario obtenido desde el local storage ${usuarioId}`);

        selectedSeats.map(async id => {
            try {
                const response = await axios.put(
                    `https://api-digitalevent.onrender.com/api/asientos/${id}`,
                    {
                        estado: "Reservado",
                        usuario_id: usuarioId
                    }
                );
                getData();
            } catch (err) {
                console.log(err);
            } finally {
                console.log("Sucefull");
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            { eventData && <Header eventData={eventData} /> }
            <div className="main-container">
                <div className="content-container">
                    <div className="left-column" style={{ display: "flex" }}>
                        {!loading && data.forma === "Cuadrado" && <Escenario1 data={data} setSelectedSeats={setSelectedSeats} />}
                        {!loading && data.forma === "Triangular" && <Escenario3 data={data} setSelectedSeats={setSelectedSeats} />}
                        {!loading && data.forma === "Redondo" && <Escenario4 data={data} setSelectedSeats={setSelectedSeats} />}
                    </div>
                    <div className="right-column">
                        <Symbology />
                    </div>
                </div>
            </div>
            {/* <button type="button" className="btn b-rigth" style={{ transform: 'translateY(40%)' }} onClick={handleSubmit}>Seleccionar</button> */}
            <Fab color="secondary" aria-label="add" variant="extended"  onClick={handleSubmit} sx={{
                position: 'fixed',
                bottom: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: '5px',
            }}>
                Seleccionar
            </Fab>
            <br/>
            <br/>
        </Fragment>
    );
}

export default Escenarios;