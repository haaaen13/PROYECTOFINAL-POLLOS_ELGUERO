function ProductoPanel({ producto }) {
  return (
    <div className="pos-item">
      <div>
        <h4>{producto.nombre}</h4>
        <p>{`$${producto.precio} x ${producto.cantidad}`}</p>
      </div>

      <span>{"$" + producto.precio * producto.cantidad}</span>
    </div>
  );
}

export default ProductoPanel;
