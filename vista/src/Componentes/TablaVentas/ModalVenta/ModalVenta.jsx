import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  buscarVenta,
  cancelarVenta,
  listarVentas,
} from "../../../Utilidades/Redux/Ventas/VentasAction";

import "./ModalVenta.css";

function ModalVenta({ open, onClose, ventaId }) {
  const dispatch = useDispatch();

  const venta = useSelector((store) => store.ventas.Venta);

  useEffect(() => {
    if (!open || !ventaId) return;

    dispatch(buscarVenta(ventaId));
  }, [dispatch, ventaId, open]);

  const handleToggle = async () => {
    try {
      await dispatch(cancelarVenta(venta.id)).unwrap();

      dispatch(listarVentas());

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="venta-modal-overlay">
      <div className="venta-modal-container">
        <div className="venta-modal-header">
          <div>
            <h2>Detalle de venta</h2>

            <span className="venta-id">Venta #{venta?.id}</span>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        <div className="venta-info-grid">
          <div className="venta-info-card">
            <span className="venta-label">Método de pago</span>

            <strong>
              {venta?.metodoPago === 1
                ? "Efectivo"
                : venta?.metodoPago === 2
                  ? "Tarjeta"
                  : venta?.metodoPago === 3
                    ? "Transferencia"
                    : "Desconocido"}
            </strong>
          </div>

          <div className="venta-info-card">
            <span className="venta-label">Fecha</span>

            <strong>
              {venta?.fechaVenta && new Date(venta.fechaVenta).toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="venta-detalles">
          <div className="venta-detalles-header">
            <span>Producto</span>

            <span>Cantidad</span>

            <span>Total</span>
          </div>

          {venta?.detalles?.map((detalle) => (
            <div className="venta-detalle-row" key={detalle.id}>
              <span>{detalle.productoNombre}</span>

              <span>{detalle.cantidad}</span>

              <span>${Number(detalle.precioTotal).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="venta-footer">
          <div className="venta-total">
            Total: ${Number(venta?.total || 0).toFixed(2)}
          </div>

          <label className="venta-checkbox">
            <input
              type="checkbox"
              checked={!venta?.cancelada}
              onChange={handleToggle}
              disabled={venta?.cancelada}
            />

            <span>Venta activa</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ModalVenta;
