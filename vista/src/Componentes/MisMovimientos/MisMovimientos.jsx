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

import { useDispatch, useSelector } from "react-redux";

import TableToolbar from "../TableToolbar/TableToolbar";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

import ModalMovimientoCaja from "./ModalMovimientoCaja/ModalMovimientoCaja";

import { listarMisMovimientos } from "../../Utilidades/Redux/MovimientosCaja/MovimientosCajaAction";

import "./MisMovimientos.css";

function MisMovimientos() {
  const dispatch = useDispatch();

  const movimientos =
    useSelector((store) => store.movimientosCaja.MisMovimientos) || [];

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(listarMisMovimientos());
  }, [dispatch]);

  const movimientosFiltrados = movimientos.filter((movimiento) =>
    movimiento.concepto.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(movimientosFiltrados, 10);

  const handleClose = () => {
    setOpenModal(false);

    dispatch(listarMisMovimientos());
  };

  return (
    <>
      <div className="movimientos-page">
        <TableToolbar
          title="Mis Movimientos"
          searchPlaceholder="Buscar movimiento..."
          buttonText="Agregar Movimiento"
          onSearch={(value) => {
            setSearch(value);
            resetPage();
          }}
          onAdd={() => setOpenModal(true)}
        />

        <TableContainer component={Paper} className="movimientos-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Concepto</TableCell>

                <TableCell>Tipo</TableCell>

                <TableCell>Monto</TableCell>

                <TableCell>Fecha</TableCell>

                <TableCell>Sucursal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((movimiento) => (
                <TableRow key={movimiento.id}>
                  <TableCell>
                    <div className="movimiento-concepto">
                      <span className="movimiento-title">
                        {movimiento.concepto}
                      </span>

                      <span className="movimiento-id">
                        Movimiento #{movimiento.id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`movimiento-badge ${
                        movimiento.tipo === 1
                          ? "movimiento-entrada"
                          : "movimiento-salida"
                      }`}
                    >
                      {movimiento.tipo === 1 ? "Entrada" : "Salida"}
                    </span>
                  </TableCell>

                  <TableCell className="movimiento-monto">
                    ${Number(movimiento.monto).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {new Date(movimiento.fecha).toLocaleString()}
                  </TableCell>

                  <TableCell>{movimiento.sucursal?.nombre}</TableCell>
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

      <ModalMovimientoCaja open={openModal} onClose={handleClose} />
    </>
  );
}

export default MisMovimientos;
