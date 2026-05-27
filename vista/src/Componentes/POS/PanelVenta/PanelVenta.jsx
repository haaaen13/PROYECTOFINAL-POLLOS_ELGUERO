// PanelVenta.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";

import "./PanelVenta.css";
import ProductoPanel from "./ProductoPanel";
import ModalCobro from "../ModalCobro/ModalCobro";

import { agregarVenta } from "../../../Utilidades/Redux/Ventas/VentasAction";

function PanelVenta({ carrito, onCancelar, detalles }) {
  const dispatch = useDispatch();

  const [openCobro, setOpenCobro] = useState(false);

  const subtotal = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.cantidad;
  }, 0);

  const iva = subtotal * 0.16;

  const total = subtotal + iva;

  const handleCobrar = () => {
    if (carrito.length === 0) return;

    setOpenCobro(true);
  };

  const confirmarPago = (metodoPago) => {
    dispatch(agregarVenta({ metodoPago, detalles }));
    onCancelar();
    setOpenCobro(false);
  };

  return (
    <>
      <div className="pos-resumen">
        <div className="pos-resumen-header">
          <h2>Orden Actual</h2>

          <span className="pos-items-count">{carrito.length} productos</span>
        </div>

        <div className="pos-resumen-items">
          {carrito.map((producto) => (
            <ProductoPanel key={producto.id} producto={producto} />
          ))}
        </div>

        <div className="pos-footer">
          <div className="pos-resumen-totales">
            <div className="total-row">
              <span>Subtotal</span>

              <span>{"$" + subtotal.toFixed(2)}</span>
            </div>

            <div className="total-row">
              <span>IVA</span>

              <span>{"$" + iva.toFixed(2)}</span>
            </div>

            <div className="total-row final">
              <span>Total</span>

              <span>{"$" + total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pos-actions">
            <button className="btn-cancelar" onClick={onCancelar}>
              Cancelar
            </button>

            <button className="btn-cobrar" onClick={handleCobrar}>
              Cobrar
            </button>
          </div>
        </div>
      </div>

      <ModalCobro
        open={openCobro}
        onClose={() => setOpenCobro(false)}
        carrito={carrito}
        subtotal={subtotal}
        iva={iva}
        total={total}
        onConfirmar={confirmarPago}
      />
    </>
  );
}

export default PanelVenta;
