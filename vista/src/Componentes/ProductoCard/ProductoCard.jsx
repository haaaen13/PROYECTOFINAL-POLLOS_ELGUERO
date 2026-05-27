import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import "./ProductoCard.css";

function ProductoCard({ producto, onEdit, onDelete, onClick }) {
  const usuario = useSelector((state) => state.auth.usuario);

  const isAdmin = usuario?.role === "Admin";

  return (
    <div className="producto-card" onClick={() => onClick?.(producto)}>
      <div className="producto-image-wrapper">
        <span
          className={`producto-status ${
            producto.activo ? "activo" : "inactivo"
          }`}
        >
          {producto.activo ? "Activo" : "Inactivo"}
        </span>
        <img
          src={
            producto.imagenUrl ||
            "https://via.placeholder.com/300x220?text=Producto"
          }
          alt={producto.nombre}
          className="producto-image"
        />
      </div>

      <div className="producto-info">
        <div>
          <h3 className="producto-title">{producto.nombre}</h3>

          <p className="producto-price">${producto.precio}</p>
        </div>

        {isAdmin && (
          <div className="producto-actions">
            <button
              className="producto-btn-edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(producto);
              }}
            >
              <Pencil size={16} />
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductoCard;
