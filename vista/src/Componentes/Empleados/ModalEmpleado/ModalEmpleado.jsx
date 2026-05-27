import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  agregarEmpleado,
  buscarEmpleado,
  editarEmpleado,
  listarEmpleados,
  toggleEmpleado,
} from "../../../Utilidades/Redux/Empleados/EmpladosActions";

import "./ModalEmpleado.css";

const initialForm = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  telefono: "",
  puesto: "",
  correo: "",
  sexo: "",
  fechaNacimiento: "",
  direccion: "",
  username: "",
  password: "",
};

function ModalEmpleado({ open, onClose, empleadoId }) {
  const dispatch = useDispatch();

  const empleado = useSelector((store) => store.empleados.Empleado);

  const esEdicion = Boolean(empleadoId);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (empleadoId) {
      dispatch(buscarEmpleado(empleadoId));
    } else {
      setForm(initialForm);
    }
  }, [dispatch, empleadoId, open]);

  useEffect(() => {
    if (!empleado || !esEdicion) return;

    setForm({
      nombre: empleado.nombre || "",
      apellidoPaterno: empleado.apellidoPaterno || "",
      apellidoMaterno: empleado.apellidoMaterno || "",
      telefono: empleado.telefono || "",
      puesto: empleado.puesto || "",
      correo: empleado.correo || "",
      sexo: empleado.sexo ?? "",
      fechaNacimiento: empleado.fechaNacimiento?.split("T")[0] || "",
      direccion: empleado.direccion || "",
      username: "",
      password: "",
    });
  }, [empleado, esEdicion]);

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "sexo" && value !== "") {
      value = Number(value);
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        await dispatch(
          editarEmpleado({
            id: empleadoId,
            data: form,
          }),
        ).unwrap();
      } else {
        await dispatch(agregarEmpleado(form)).unwrap();
      }

      dispatch(listarEmpleados());

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async () => {
    if (!empleado) return;

    try {
      await dispatch(toggleEmpleado(empleado.id)).unwrap();

      dispatch(listarEmpleados());

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="empleado-modal-overlay">
      <div className="empleado-modal-container">
        <div className="empleado-modal-header">
          <h2>{esEdicion ? "Editar empleado" : "Agregar empleado"}</h2>

          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="empleado-modal-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido paterno"
            value={form.apellidoPaterno}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido materno"
            value={form.apellidoMaterno}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

          <input
            type="text"
            name="puesto"
            placeholder="Puesto"
            value={form.puesto}
            onChange={handleChange}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />

          <select name="sexo" value={form.sexo} onChange={handleChange}>
            <option value="">Seleccionar sexo</option>

            <option value={0}>Masculino</option>

            <option value={1}>Femenino</option>

            <option value={2}>Otro</option>
          </select>

          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="empleado-full"
          />

          {!esEdicion && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={form.username}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
              />
            </>
          )}

          <div className="empleado-modal-footer empleado-full">
            {esEdicion && empleado && (
              <button
                type="button"
                className="empleado-btn-toggle"
                onClick={handleToggle}
              >
                {empleado.activo ? "Desactivar" : "Activar"}
              </button>
            )}

            <div className="empleado-footer-right">
              <button
                type="button"
                className="empleado-btn-cancel"
                onClick={onClose}
              >
                Cancelar
              </button>

              <button type="submit" className="empleado-btn-save">
                {esEdicion ? "Guardar cambios" : "Guardar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEmpleado;
