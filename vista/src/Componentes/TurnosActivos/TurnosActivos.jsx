// TurnosActivos.jsx

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

import { listarTurnosActivos } from "../../Utilidades/Redux/TurnosCaja/TurnosCajaAction";

import TableToolbar from "../TableToolbar/TableToolbar";

import "../TableToolbar/TableToolbar.css";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

function TurnosActivos() {
  const dispatch = useDispatch();

  const TurnosActivos = useSelector((store) => store.turnosCaja.TurnosActivos);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(listarTurnosActivos());
  }, [dispatch]);

  const turnosFiltrados = TurnosActivos.filter((turno) =>
    `${turno.nombreEmpleado} ${turno.apellidoEmpleado}`
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
  } = usePagination(TurnosActivos, 10);

  return (
    <>
      <div className="tabla-container">
        <TableToolbar
          title="Turnos Activos"
          searchPlaceholder="Buscar turno..."
          buttonText="Actualizar"
          onSearch={(value) => {
            setSearch(value);

            resetPage();
          }}
          onAdd={() => dispatch(listarTurnosActivos())}
          showButton={false}
        />

        <TableContainer component={Paper} className="custom-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Empleado</TableCell>

                <TableCell>Sucursal</TableCell>

                <TableCell>Fecha Apertura</TableCell>

                <TableCell>Fondo Inicial</TableCell>

                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((turno) => (
                <TableRow key={turno.id}>
                  <TableCell>
                    <div className="empleado-info">
                      <div>
                        <span className="empleado-nombre">
                          {turno.empleadoNombre} {turno.empleadoApellidoPaterno}
                        </span>

                        <span className="empleado-id">Turno #{turno.id}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{turno.sucursalNombre}</TableCell>

                  <TableCell>
                    {new Date(turno.fechaApertura).toLocaleString()}
                  </TableCell>

                  <TableCell>${turno.fondoInicial.toFixed(2)}</TableCell>

                  <TableCell align="right">
                    <button className="action-btn">
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
    </>
  );
}

export default TurnosActivos;
