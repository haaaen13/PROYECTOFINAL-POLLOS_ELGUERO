import { useState } from "react";

import "./ModalCobro.css";

function ModalCobro({
  open,
  onClose,
  total,
  subtotal,
  iva,
  carrito,
  onConfirmar,
}) {
  const [metodoPago, setMetodoPago] = useState(1);

  if (!open) return null;

  return (
    <div className="modal-cobro-overlay">
      <div className="modal-cobro">
        <div className="modal-cobro-header">
          <div>
            <span className="modal-label">Resumen</span>

            <h2>Confirmar venta</h2>
          </div>
        </div>

        <div className="modal-cobro-body">
          <div className="modal-resumen">
            <div className="modal-row">
              <span>Productos</span>

              <span>{carrito.length}</span>
            </div>

            <div className="modal-row">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="modal-row">
              <span>IVA</span>

              <span>${iva.toFixed(2)}</span>
            </div>

            <div className="modal-row total">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="modal-group">
            <label>Método de pago</label>

            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(Number(e.target.value))}
            >
              <option value={1}>Efectivo</option>

              <option value={2}>Tarjeta</option>

              <option value={3}>Transferencia</option>
            </select>
          </div>
        </div>

        <div className="modal-cobro-footer">
          <button className="btn-cerrar-modal" onClick={onClose}>
            Cerrar
          </button>

          <button
            className="btn-confirmar-modal"
            onClick={() => onConfirmar(metodoPago)}
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCobro;
