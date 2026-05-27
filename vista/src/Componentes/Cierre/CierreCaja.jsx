import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import TableToolbar from "../TableToolbar/TableToolbar";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

import { listarMisCierres } from "../../Utilidades/Redux/CierreCaja/CierreCajaActions";

import ModalCerrarCaja from "./ModalCerrarCaja/ModalCerrarCaja";

import "./CierreCaja.css";

function CierreCaja() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cierres = useSelector((store) => store.CierreCaja.Cierres) || [];

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(listarMisCierres());
  }, [dispatch]);

  const cierresFiltrados = cierres.filter((cierre) =>
    cierre.sucursal?.nombre?.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(cierresFiltrados, 10);

  const handleClose = () => {
    setOpenModal(false);
    dispatch(listarMisCierres());
    navigate("/pos");
  };

  return (
    <>
      <div className="cierres-page">
        <TableToolbar
          title="Mis cierres"
          searchPlaceholder="Buscar sucursal..."
          buttonText="Cerrar Caja"
          onSearch={(value) => {
            setSearch(value);

            resetPage();
          }}
          onAdd={() => setOpenModal(true)}
        />

        <TableContainer component={Paper} className="cierres-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sucursal</TableCell>

                <TableCell>Total ventas</TableCell>

                <TableCell>Efectivo esperado</TableCell>

                <TableCell>Efectivo real</TableCell>

                <TableCell>Diferencia</TableCell>

                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((cierre) => (
                <TableRow key={cierre.id}>
                  <TableCell>{cierre.sucursal?.nombre}</TableCell>

                  <TableCell>
                    ${Number(cierre.totalVentas).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    ${Number(cierre.efectivoEsperado).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    ${Number(cierre.efectivoReal).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`cierre-estado ${
                        cierre.diferencia < 0
                          ? "cierre-faltante"
                          : "cierre-correcto"
                      }`}
                    >
                      ${Number(cierre.diferencia).toFixed(2)}
                    </span>
                  </TableCell>

                  <TableCell>
                    {new Date(cierre.fechaCierre).toLocaleString()}
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

      <ModalCerrarCaja open={openModal} onClose={handleClose} />
    </>
  );
}

export default CierreCaja;
