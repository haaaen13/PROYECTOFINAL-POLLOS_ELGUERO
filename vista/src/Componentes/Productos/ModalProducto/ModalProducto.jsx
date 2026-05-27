// ModalProducto.jsx

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { useDispatch } from "react-redux";

import {
  agregarProducto,
  editarProducto,
} from "../../../Utilidades/Redux/Productos/ProductosAction";

import "./ModalProducto.css";

function ModalProducto({ open, onClose, producto }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoria: 1,
    activo: true,
  });

  const onGuardar = async () => {
    const data = {
      ...formData,
      precio: parseFloat(formData.precio),
      categoria: parseInt(formData.categoria),
    };

    if (producto) {
      await dispatch(
        editarProducto({
          id: producto.id,
          data,
        }),
      );
    } else {
      await dispatch(agregarProducto(data));
    }

    onClose();
  };

  useEffect(() => {
    if (producto) {
      setFormData({
        ...producto,
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        imagenUrl: "",
        categoria: 1,
        activo: true,
      });
    }
  }, [producto]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-producto">
        <div className="modal-header">
          <h2>{producto ? "Editar Producto" : "Agregar Producto"}</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Nombre</label>

            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nombre: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>

            <textarea
              rows="3"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descripcion: e.target.value,
                })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio</label>

              <input
                type="number"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>

              <select
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoria: e.target.value,
                  })
                }
              >
                <option value={1}>Hamburguesas</option>
                <option value={2}>Hotdogs</option>
                <option value={3}>Papas</option>
                <option value={4}>Bebidas</option>
                <option value={5}>Combos</option>
                <option value={6}>Extras</option>
                <option value={7}>Postre</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>URL Imagen</label>

            <input
              type="text"
              placeholder="https://..."
              value={formData.imagenUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imagenUrl: e.target.value,
                })
              }
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={formData.activo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  activo: e.target.checked,
                })
              }
            />

            <label>Producto Activo</label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>

          <button className="save-btn" onClick={onGuardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProducto;
