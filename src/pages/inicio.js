import React from "react";
import "./inicio.css";
import logo from "../assets/logocmpc.png";
import logoEdipac from "../assets/logoEdipac.png";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  const handleBotonCotizar = () => {
    // Navegar a la página de Inicio
    navigate("/");
  };
  return (
    <div className="contenedor">
      <div className="elementos">
        <h1>Cotizador de BCM</h1>
        <div className="logos">
          <img src={logo} />
          <img src={logoEdipac} />
        </div>
        <button className="botonCotizar" onClick={handleBotonCotizar}>
          Cotizar
        </button>
      </div>
    </div>
  );
}

export default Inicio;
