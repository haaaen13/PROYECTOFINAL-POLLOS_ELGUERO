// POSContainer.jsx

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import POS from "./POS/POS";

import ModalAbrirTurno from "./ModalAbrirTurno/ModalAbrirTurno";

import { obtenerTurnoActivo } from "../../Utilidades/Redux/TurnosCaja/TurnosCajaAction";

function POSContainer() {
  const dispatch = useDispatch();

  const TurnoActivo = useSelector((store) => store.turnosCaja.TurnoActivo);

  useEffect(() => {
    dispatch(obtenerTurnoActivo());
  }, [dispatch]);

  return (
    <>{!TurnoActivo ? <ModalAbrirTurno /> : <POS turno={TurnoActivo} />}</>
  );
}

export default POSContainer;
