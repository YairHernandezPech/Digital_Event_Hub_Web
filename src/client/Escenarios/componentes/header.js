import React from 'react';
import "../../../style.css";

const Header = ({ eventData }) => {
    return (
        <div
            className="headers"
            style={{
                backgroundImage: `url(${eventData?.imagen_url || "https://e.radio-grpp.io/normal/2016/08/17/553455_221714.png"})`
            }}
        >
            <div className="header-content">
                <div className="header-text1">
                    {eventData?.evento_nombre || "Conferencia de tecnología"}
                </div>
                <div className="subtext1">
                    {`Evento ${eventData?.tipo_evento}` || "Evento Público"}
                </div>
            </div>
        </div>
    );
}

export default Header;
