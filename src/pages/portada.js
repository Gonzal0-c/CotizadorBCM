import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./portada.css";
import logo from "../assets/logocmpc.png";
import logoEdipac from "../assets/logoEdipac.png";
// import { getFirestore } from "firebase/firestore";
// import appFirebase from "../firebase-config";
// import firebase from "firebase/app";

// const db = getFirestore(appFirebase);

function Portada() {
  const navigate = useNavigate();
  // Estado para almacenar el valor del input "bolsas"
  const [valorLargoSaco, setValorLargoSaco] = useState("");
  const [valorAnchoSaco, setValorAnchoSaco] = useState("");
  const [valorAnchoFondo, setValorAnchoFondo] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [tipoDePapel, setTipoDePapel] = useState("");
  const [refile, setRefile] = useState("");
  const valorPegamentoPVA = 3.37;
  const valorPegamentoVegetal = 1.21;
  const valorPegamentoHotmelt = 4.98;
  const [multiplicador, setMultiplicador] = useState(0);
  const [loteFabricacion, setLoteFabricacion] = useState(0);
  const [sumaRefile, setSumaRefile] = useState(0);

  // const [adhesivos, setAdhesivos] = useState([]);

  // useEffect(() => {
  //   // Obtiene la referencia de la colección "Adhesivos"
  //   const adhesivosRef = firebase.firestore().collection("Adhesivos");

  //   // Escucha los cambios en la colección "Adhesivos" y actualiza el estado
  //   const unsubscribe = adhesivosRef.onSnapshot((snapshot) => {
  //     const nuevosAdhesivos = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setAdhesivos(nuevosAdhesivos);
  //     console.log("Adhesivos:", nuevosAdhesivos);
  //   });

  //   Limpia el listener cuando el componente se desmonta
  //   return () => unsubscribe();
  // }, []);

  // Función para manejar el cambio en el input "bolsas"
  const handleLargoSacoChange = (e) => {
    setValorLargoSaco(e.target.value);
  };

  const handleAnchoSacoChange = (e) => {
    setValorAnchoSaco(e.target.value);
  };

  const handleAnchoFondoChange = (e) => {
    setValorAnchoFondo(e.target.value);
  };

  const handleOpcionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const handlePapelChange = (e) => {
    const value = e.target.value;
    setTipoDePapel(value);

    // Actualiza el multiplicador dependiendo del tipo de papel seleccionado
    if (value === "opcion1") {
      setMultiplicador(100);
    } else if (value === "opcion2") {
      setMultiplicador(110);
    } else {
      // Otro manejo en caso de agregar más opciones en el futuro
      setMultiplicador(0);
    }
  };

  //Refile
  const handleRefileChange = (e) => {
    const value = e.target.value;
    setRefile(value);

    // Actualiza el multiplicador dependiendo del tipo de papel seleccionado
    if (value === "opcion1") {
      setSumaRefile(0);
    } else if (value === "opcion2") {
      setSumaRefile(10);
    } else {
      // Otro manejo en caso de agregar más opciones en el futuro
      setSumaRefile(0);
    }
  };

  const handleLoteChange = (e) => {
    setLoteFabricacion(e.target.value);
  };

  const opcionesColor = [
    { value: "opcion0", label: "Selecciona..." },
    { value: "opcion1", label: "0%" },
    { value: "opcion2", label: "25%" },
    { value: "opcion3", label: "50%" },
    { value: "opcion4", label: "75%" },
    { value: "opcion5", label: "100%" },
  ];

  const valoresIntervalosLargoPapel = [
    380, 400, 420, 440, 480, 500, 505, 520, 530, 540, 575, 580,
  ];

  const largoSacoNumero = parseInt(valorLargoSaco);
  const anchoSacoNumero = parseInt(valorAnchoSaco);
  const anchoFondoNumero = parseFloat(valorAnchoFondo);

  const plong = 30;

  const largoPapel = largoSacoNumero + (anchoFondoNumero / 3) * 2; //esto es solo cuando la bolsa no lleva impresión
  const largoPapelMinimoIntervalo =
    largoSacoNumero + (anchoFondoNumero / 3) * 2;
  const largoPapelMaximoIntervalo =
    largoSacoNumero + (anchoFondoNumero / 4) * 3;

  const anchoPapel = 2 * anchoSacoNumero + 2 * anchoFondoNumero + plong;

  const intervalorLargoPapel = [
    largoPapelMinimoIntervalo,
    largoPapelMaximoIntervalo,
  ];

  const valoresDentroDelIntervalo = valoresIntervalosLargoPapel.filter(
    (valor) => {
      return (
        valor >= intervalorLargoPapel[0] && valor <= intervalorLargoPapel[1]
      );
    }
  );

  const largoPapelFinal = Math.min(...valoresDentroDelIntervalo);

  const solapa = largoPapelFinal - largoSacoNumero;
  const cruce = anchoFondoNumero - 2 * (anchoFondoNumero - solapa);
  const refuerzos = 4;

  const consumoTeoricoPapelBolsa =
    (anchoPapel / 1000) * (largoPapel / 1000) * multiplicador;

  const puestaAPuntoPapel = (400 * consumoTeoricoPapelBolsa) / 1000;

  const elaboracionPapel =
    ((loteFabricacion * consumoTeoricoPapelBolsa) / 1000) * 0.1;

  const consumoTotalPapel =
    elaboracionPapel +
    puestaAPuntoPapel +
    (loteFabricacion * consumoTeoricoPapelBolsa) / 1000;

  //manillas
  const consumoTeoricoManilla =
    (200 / 1000) * (50 / 1000) * refuerzos * multiplicador;

  const puestaAPuntoManilla = (consumoTeoricoManilla * 400) / 1000;

  const elaboracionManilla =
    ((loteFabricacion * consumoTeoricoManilla) / 1000) * 0.1;

  const consumoTotalManilla =
    elaboracionManilla +
    puestaAPuntoManilla +
    (loteFabricacion * consumoTeoricoManilla) / 1000;

  //adhesivoPVA
  const consumoTeoricoAdhesivoPVA = (largoPapelFinal / 1000) * 2;

  const puestaAPuntoAdhesivoPVA =
    (largoPapelFinal * consumoTeoricoAdhesivoPVA) / 1000;

  const elaboracionAdhesivoPVA =
    ((loteFabricacion * consumoTeoricoAdhesivoPVA) / 1000) * 0.1;

  const consumoTotalAdhesivoPVA =
    (elaboracionAdhesivoPVA +
      puestaAPuntoAdhesivoPVA +
      (loteFabricacion * consumoTeoricoAdhesivoPVA) / 1000) *
    0.95 *
    0.75;

  // Función para manejar el evento de clic en el botón "Cotizar"
  const handleCotizarClick = () => {
    // Muestra el valor de "bolsas" por consola
    console.log("Valor LargoSaco:", valorLargoSaco);
    console.log("Valor anchoSaco:", valorAnchoSaco);
    console.log("Valor Ancho Fondo:", valorAnchoFondo);
    console.log("P. long", plong);
    console.log("largo papel", largoPapel);
    console.log("intervalorLargoPapel:", intervalorLargoPapel);
    console.log("solapa", solapa);
    console.log("cruce", cruce);
    console.log("anchoPapel", anchoPapel);
    console.log(
      "valoresIntervalosLargoPapel[0]",
      valoresIntervalosLargoPapel[0]
    );
    console.log("Valores dentro del intervalo:", valoresDentroDelIntervalo);
    console.log("El valor más bajo dentro del intervalo es:", largoPapelFinal);
    console.log("tipoDePapel:", tipoDePapel);
    console.log("consumoTeoricoPapelBolsa", consumoTeoricoPapelBolsa);
    console.log("puestaAPuntoPapel", puestaAPuntoPapel);
    console.log("elaboracionPapel", elaboracionPapel);
    console.log("consumoTotalPapel", consumoTotalPapel);
    console.log("consumoTeoricoManilla", consumoTeoricoManilla);
    console.log("puestaAPuntoManilla", puestaAPuntoManilla);
    console.log("elaboracionManilla", elaboracionManilla);
    console.log("consumoTotalManilla", consumoTotalManilla);
    console.log("consumoTeoricoAdhesivoPVA", consumoTeoricoAdhesivoPVA);
    console.log("puestaAPuntoAdhesivoPVA", puestaAPuntoAdhesivoPVA);
    console.log("elaboracionAdhesivoPVA", elaboracionAdhesivoPVA);
    console.log("consumoTotalAdhesivoPVA", consumoTotalAdhesivoPVA);
    console.log("Refile", refile);
  };

  // Función para manejar el evento de clic en el botón "Borrar campos"
  const handleBorrarCamposClick = () => {
    setValorLargoSaco("");
    setValorAnchoSaco("");
    setOpcionSeleccionada("");
  };

  const isBolsaSinManillaSelected = opcionSeleccionada === "opcion3";
  const columna3InputsDisabled = isBolsaSinManillaSelected ? "disabled" : "";

  const handleVolverClick = () => {
    // Navegar a la página de Inicio
    navigate("/inicio");
  };

  return (
    <div className="portada">
      <header className="portada-header">
        <h3>Cotizador BCM</h3>
      </header>
      <div className="portadaBody">
        <div className="inputIndividualPortada">
          <p>Tipo de envase</p>
          <select
            className="inputSelectPortada"
            value={opcionSeleccionada}
            onChange={handleOpcionChange}
          >
            <option value="opcion0">Seleciona...</option>
            {/* <option value="opcion1">Bolsa manilla rizada</option> */}
            <option value="opcion2">Bolsa con impresión</option>
            <option value="opcion3">Bolsa sin impresión</option>
          </select>
        </div>

        <div className="formularioPortada">
          <div className="columna1">
            <h2>Cantidad y Medidas</h2>
            <div className="inputIndividualPortada">
              <p>Lote/Cantidad</p>
              <input
                type="number"
                placeholder="Bolsas a elaborar"
                min="0"
                value={loteFabricacion}
                onChange={handleLoteChange}
              />
            </div>
            <div className="inputIndividualPortada">
              <p>Largo Saco (mm)</p>
              <input
                type="number"
                min="0"
                //                max="3"
                placeholder="Milímetros"
                value={valorLargoSaco}
                onChange={handleLargoSacoChange}
              />
            </div>
            <div className="inputIndividualPortada">
              <p>Ancho Saco (mm)</p>
              <input
                type="number"
                min="0"
                placeholder="Milímetros"
                value={valorAnchoSaco}
                onChange={handleAnchoSacoChange}
              />
            </div>
            <div className="inputIndividualPortada">
              <p>Ancho Fondo (mm)</p>
              <input
                type="number"
                min="0"
                placeholder="Milímetros"
                value={valorAnchoFondo}
                onChange={handleAnchoFondoChange}
              />
            </div>
          </div>
          <div className="columna2">
            <h2>Papeles</h2>
            <div className="inputIndividualPortada">
              <p>Tipo de papel</p>
              <select
                className="inputSelectPapel"
                value={tipoDePapel}
                onChange={handlePapelChange}
              >
                <option value="opcion0">Seleciona...</option>
                <option value="opcion1">Papel Blanco</option>
                <option value="opcion2">Papel Cafe</option>
              </select>
            </div>
            <div className="inputIndividualPortada">
              <p>Color manilla</p>
              <select className="inputSelectPapel">
                <option value="opcion0">Seleciona...</option>
                <option value="opcion1">Color blanco</option>
                <option value="opcion3">Color Café</option>
                <option value="opcion4">Color Negro</option>
              </select>
            </div>
            <div className="inputIndividualPortada">
              <p>Refuerzos</p>
              <input type="number" placeholder="Ingresa algo..." min="0" />
            </div>
            <div className="inputIndividualPortada">
              <p>N° Manillas</p>
              <input type="text" placeholder="Ingresa algo..." />
            </div>
          </div>
          <div className="columna3">
            <h2>Colores</h2>
            <div className="inputIndividualPortada">
              <p>Refile</p>
              <select
                className="inputSelectPorcentajeColor"
                value={refile}
                onChange={handleRefileChange}
                disabled={columna3InputsDisabled}
              >
                <option value="opcion0">Seleciona...</option>
                <option value="opcion1">0</option>
                <option value="opcion2">10</option>
              </select>
            </div>
            <div className="inputIndividualPortada">
              <p>N° de colores</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                <option value="opcion0">Seleciona...</option>
                <option value="opcion1">1</option>
                <option value="opcion2">2</option>
                <option value="opcion3">3</option>
                <option value="opcion4">4</option>
                <option value="opcion5">5</option>
                <option value="opcion6">6</option>
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 1</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 2</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 3</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 4</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 5</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputIndividualColor">
              <p>% de color 6</p>
              <select
                className="inputSelectPorcentajeColor"
                disabled={columna3InputsDisabled}
              >
                {opcionesColor.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="containerBotones">
          <button className="botonVolver" onClick={handleVolverClick}>
            Volver
          </button>
          <button className="botonCotizar" onClick={handleCotizarClick}>
            Cotizar
          </button>
          <button
            className="botonBorrarCampos"
            onClick={handleBorrarCamposClick}
          >
            Borrar campos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Portada;
