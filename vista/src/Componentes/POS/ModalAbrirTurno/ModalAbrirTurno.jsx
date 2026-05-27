// ModalAbrirTurno.jsx

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { abrirTurno } from "../../../Utilidades/Redux/TurnosCaja/TurnosCajaAction";

import { listarProductos } from "../../../Utilidades/Redux/Productos/ProductosAction";
import { listarSucursales } from "../../../Utilidades/Redux/Sucursales/SucursalesAction";
import { cerrarSesion } from "../../../Utilidades/Redux/Login/LoginAction";
import "./ModalAbrirTurno.css";

function ModalAbrirTurno() {
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.turnosCaja);

  const usuario = useSelector((store) => store.auth?.usuario);

  const [form, setForm] = useState({
    fondoInicial: "",
    sucursalId: "",
  });

  const sucursales = useSelector((store) => store.sucursales.Sucursales);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.fondoInicial || !form.sucursalId) {
      return;
    }

    dispatch(
      abrirTurno({
        fondoInicial: Number(form.fondoInicial),

        sucursalId: Number(form.sucursalId),
      }),
    );
  };

  useEffect(() => {
    dispatch(listarSucursales());
  }, [dispatch]);

  return (
    <div className="modal-turno-overlay">
      <div className="modal-turno">
        <div className="modal-turno-header">
          <div>
            <span className="modal-turno-label">Usuario</span>

            <h2>
              {usuario?.empleado?.nombre} {usuario?.empleado?.apellidoPaterno}
            </h2>
          </div>
        </div>

        <div className="modal-turno-body">
          <div className="modal-turno-group">
            <label>Fondo inicial</label>

            <input
              type="number"
              name="fondoInicial"
              placeholder="$0.00"
              value={form.fondoInicial}
              onChange={handleChange}
            />
          </div>

          <div className="modal-turno-group">
            <label>Sucursal</label>

            <select
              name="sucursalId"
              value={form.sucursalId}
              onChange={handleChange}
            >
              <option value="">Selecciona una sucursal</option>

              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-turno-footer">
          <button
            className="btn-cerrar"
            onClick={() => dispatch(cerrarSesion())}
          >
            Cerrar Sesion
          </button>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Abriendo..." : "Abrir Turno"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAbrirTurno;
