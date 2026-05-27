import { useState } from "react";

import { X } from "lucide-react";

import { useDispatch } from "react-redux";

import { crearMovimientoCaja } from "../../../Utilidades/Redux/MovimientosCaja/MovimientosCajaAction";

import "./ModalMovimientoCaja.css";

function ModalMovimientoCaja({ open, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    monto: "",
    tipo: 1,
    concepto: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      crearMovimientoCaja({
        monto: Number(formData.monto),
        tipo: Number(formData.tipo),
        concepto: formData.concepto,
      }),
    );

    setFormData({
      monto: "",
      tipo: 1,
      concepto: "",
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="movimiento-modal-overlay">
      <div className="movimiento-modal-container">
        <div className="movimiento-modal-header">
          <h2>Nuevo Movimiento</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="movimiento-modal-body" onSubmit={handleSubmit}>
          <div className="movimiento-form-row">
            <div className="movimiento-form-group">
              <label>Tipo</label>

              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo: e.target.value,
                  })
                }
              >
                <option value={1}>Entrada</option>

                <option value={2}>Salida</option>
              </select>
            </div>

            <div className="movimiento-form-group">
              <label>Monto</label>

              <input
                type="number"
                step="0.01"
                placeholder="$0.00"
                value={formData.monto}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monto: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="movimiento-form-group">
            <label>Concepto</label>

            <textarea
              rows="4"
              placeholder="Describe el movimiento..."
              value={formData.concepto}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  concepto: e.target.value,
                })
              }
            />
          </div>

          <div className="movimiento-modal-footer">
            <button
              type="button"
              className="movimiento-btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="movimiento-btn-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalMovimientoCaja;
