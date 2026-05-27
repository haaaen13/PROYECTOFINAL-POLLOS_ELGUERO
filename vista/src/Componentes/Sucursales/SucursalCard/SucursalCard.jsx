import { MapPin, Phone, Clock3, User, Pencil } from "lucide-react";

import "./SucursalCard.css";

function SucursalCard({ sucursal, onEdit }) {
  return (
    <div className="sucursal-card">
      <img
        src={sucursal.imagenUrl}
        alt={sucursal.nombre}
        className="sucursal-image"
      />

      <div className="sucursal-content">
        <div>
          <div className="sucursal-header">
            <h3>{sucursal.nombre}</h3>

            <span
              className={`estado-badge ${
                sucursal.activa ? "activo" : "inactivo"
              }`}
            >
              {sucursal.activa ? "Activa" : "Inactiva"}
            </span>
          </div>

          <div className="sucursal-info">
            <p>
              <MapPin size={16} />
              {sucursal.direccion}
            </p>

            <p>
              <Phone size={16} />
              {sucursal.telefono}
            </p>

            <p>
              <User size={16} />
              {sucursal.encargado}
            </p>

            <p>
              <Clock3 size={16} />
              {sucursal.horario}
            </p>
          </div>
        </div>

        <button className="edit-sucursal-btn" onClick={onEdit}>
          <Pencil size={16} />
          Editar
        </button>
      </div>
    </div>
  );
}

export default SucursalCard;
