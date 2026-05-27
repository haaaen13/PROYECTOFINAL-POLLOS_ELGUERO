import { useEffect, useState } from "react";

import { X, Upload } from "lucide-react";

import { useDispatch } from "react-redux";

import {
  editarSucursal,
  agregarSucursal,
} from "../../../Utilidades/Redux/Sucursales/SucursalesAction";

import "./ModalSucursal.css";

function ModalSucursal({ open, onClose, sucursal }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    encargado: "",
    horario: "",
    imagenUrl: "",
  });

  const onGuardar = async () => {
    if (sucursal) {
      await dispatch(
        editarSucursal({
          id: formData.id,
          data: formData,
        }),
      );
    } else {
      await dispatch(agregarSucursal(formData));
    }

    onClose();
  };

  useEffect(() => {
    if (sucursal) {
      setFormData(sucursal);
    } else {
      setFormData({
        nombre: "",
        direccion: "",
        telefono: "",
        encargado: "",
        horario: "",
        imagenUrl: "",
      });
    }
  }, [sucursal]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{sucursal ? "Editar Sucursal" : "Agregar Sucursal"}</h2>

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
            <label>Dirección</label>

            <input
              type="text"
              value={formData.direccion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  direccion: e.target.value,
                })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>

              <input
                type="text"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefono: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Encargado</label>

              <input
                type="text"
                value={formData.encargado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    encargado: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Horario</label>

            <input
              type="text"
              placeholder="8:00 AM - 10:00 PM"
              value={formData.horario}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  horario: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group full">
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

export default ModalSucursal;
