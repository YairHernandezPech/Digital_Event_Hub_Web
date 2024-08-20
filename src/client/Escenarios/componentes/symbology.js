import React from 'react';
import "../../../styles/style.css";
import img1 from "../../../img/img1.png";
import img2 from "../../../img/img2.png";
import img3 from "../../../img/img3.png";
const Symbology = () => {
    return ( 
        <div className="custom-container">
        <div className="row mb-3 align-items-center">
            <div className="col-3 icon1">
                <img src={img1} alt="Asiento No disponible" />
            </div>
            <div className="col-9">
                <span style={{color: "black"}}>Available</span>
            </div>
        </div>
        <div className="divider"></div>
        <div className="row mb-3 align-items-center">
            <div className="col-3 icon1">
                <img src={img2} alt="Asiento Disponible" />
            </div>
            <div className="col-9">
                <span style={{color: "black"}}>Select</span>
            </div>
        </div>
        <div className="divider"></div>
        <div className="row align-items-center">
            <div className="col-3 icon1">
                <img src={img3} alt="Asiento Ocupado" />
            </div>
            <div className="col-9">
                <span style={{color: "black"}}>Not available</span>
            </div>
        </div>
    </div>
     );
}
 
export default Symbology;