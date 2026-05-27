// ModalCerrarCaja.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  cerrarCaja,
  obtenerResumenCierre,
} from "../../../Utilidades/Redux/CierreCaja/CierreCajaActions";

import "./ModalCerrarCaja.css";

function ModalCerrarCaja({ open, onClose }) {
  const dispatch = useDispatch();

  const resumen = useSelector((store) => store.CierreCaja.Resumen);

  const [form, setForm] = useState({
    efectivoReal: "",
    observaciones: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(obtenerResumenCierre());
    }
  }, [open, dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const diferencia =
    Number(form.efectivoReal || 0) - Number(resumen?.efectivoEsperado || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        cerrarCaja({
          efectivoReal: Number(form.efectivoReal),
          observaciones: form.observaciones,
        }),
      ).unwrap();

      setForm({
        efectivoReal: "",
        observaciones: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="cierre-modal-overlay">
      <div className="cierre-modal-container">
        <div className="cierre-modal-header">
          <h2>Cierre de caja</h2>

          <button onClick={onClose} className="cierre-modal-close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cierre-modal-body">
          <div className="cierre-layout">
            <div className="cierre-resumen-grid">
              <div className="cierre-card">
                <span>Fondo inicial</span>

                <strong>
                  ${Number(resumen?.fondoInicial || 0).toFixed(2)}
                </strong>
              </div>

              <div className="cierre-card">
                <span>Ventas efectivo</span>

                <strong>
                  ${Number(resumen?.ventasEfectivo || 0).toFixed(2)}
                </strong>
              </div>

              <div className="cierre-card">
                <span>Ventas tarjeta</span>

                <strong>
                  ${Number(resumen?.ventasTarjeta || 0).toFixed(2)}
                </strong>
              </div>

              <div className="cierre-card">
                <span>Transferencias</span>

                <strong>
                  ${Number(resumen?.ventasTransferencia || 0).toFixed(2)}
                </strong>
              </div>

              <div className="cierre-card">
                <span>Entradas</span>

                <strong>${Number(resumen?.entradas || 0).toFixed(2)}</strong>
              </div>

              <div className="cierre-card">
                <span>Salidas</span>

                <strong>${Number(resumen?.salidas || 0).toFixed(2)}</strong>
              </div>

              <div className="cierre-card cierre-destacado">
                <span>Efectivo esperado</span>

                <strong>
                  ${Number(resumen?.efectivoEsperado || 0).toFixed(2)}
                </strong>
              </div>

              <div className="cierre-card">
                <span>Total ventas</span>

                <strong>${Number(resumen?.totalVentas || 0).toFixed(2)}</strong>
              </div>
            </div>

            <div className="cierre-side-panel">
              <div className="cierre-form-group">
                <label>Efectivo real contado</label>

                <input
                  type="number"
                  step="0.01"
                  name="efectivoReal"
                  value={form.efectivoReal}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div
                className={`cierre-diferencia ${
                  diferencia < 0 ? "faltante" : "sobrante"
                }`}
              >
                <span>Diferencia</span>

                <strong>${diferencia.toFixed(2)}</strong>
              </div>

              <div className="cierre-form-group">
                <label>Observaciones</label>

                <textarea
                  name="observaciones"
                  value={form.observaciones}
                  onChange={handleChange}
                  placeholder="Agregar observaciones..."
                />
              </div>

              <div className="cierre-modal-footer">
                <button
                  type="button"
                  onClick={onClose}
                  className="cierre-btn-cancel"
                >
                  Cancelar
                </button>

                <button type="submit" className="cierre-btn-save">
                  Confirmar cierre
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCerrarCaja;
