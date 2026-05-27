import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { ArrowUpRight } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { listarEmpleados } from "../../Utilidades/Redux/Empleados/EmpladosActions";

import TableToolbar from "../TableToolbar/TableToolbar";

import "../TableToolbar/TableToolbar.css";

import ModalEmpleado from "./ModalEmpleado/ModalEmpleado";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

import "./Empleados.css";

function Empleados() {
  const dispatch = useDispatch();

  const empleadosState = useSelector((store) => store.empleados);

  const empleados = empleadosState?.Empleados || [];

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    dispatch(listarEmpleados());
  }, [dispatch]);

  const empleadosFiltrados = empleados.filter((empleado) =>
    `${empleado.nombre} ${empleado.apellidoPaterno}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(empleadosFiltrados, 10);

  const abrirAgregar = () => {
    setEmpleadoSeleccionado(null);

    setOpenModal(true);
  };

  const abrirEditar = (empleado) => {
    setEmpleadoSeleccionado(empleado);

    setOpenModal(true);
  };

  const cerrarModal = () => {
    setOpenModal(false);

    setEmpleadoSeleccionado(null);
  };

  return (
    <>
      <div className="tabla-container">
        <TableToolbar
          title="Empleados"
          searchPlaceholder="Buscar empleado..."
          buttonText="Agregar empleado"
          onSearch={(value) => {
            setSearch(value);

            resetPage();
          }}
          onAdd={abrirAgregar}
        />

        <TableContainer component={Paper} className="custom-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Empleado</TableCell>

                <TableCell>Puesto</TableCell>

                <TableCell>Correo</TableCell>

                <TableCell>Teléfono</TableCell>

                <TableCell>Estado</TableCell>

                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell>
                    <div className="empleado-info">
                      <div>
                        <span className="empleado-nombre">
                          {empleado.nombre} {empleado.apellidoPaterno}
                        </span>

                        <span className="empleado-id">ID #{empleado.id}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{empleado.puesto}</TableCell>

                  <TableCell>{empleado.correo}</TableCell>

                  <TableCell>{empleado.telefono}</TableCell>

                  <TableCell>
                    <span
                      className={`estado-badge ${
                        empleado.activo ? "activo" : "inactivo"
                      }`}
                    >
                      {empleado.activo ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <button
                      className="action-btn"
                      onClick={() => abrirEditar(empleado)}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNext={nextPage}
        onPrev={prevPage}
      />

      <ModalEmpleado
        open={openModal}
        onClose={cerrarModal}
        empleadoId={empleadoSeleccionado?.id}
      />
    </>
  );
}

export default Empleados;
