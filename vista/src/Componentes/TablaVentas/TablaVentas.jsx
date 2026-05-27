import { useState } from "react";

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

import ModalVenta from "./ModalVenta/ModalVenta";

import "./TablaVentas.css";

function TablaVentas({ ventas }) {
  const [openModal, setOpenModal] = useState(false);

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const abrirModal = (venta) => {
    setVentaSeleccionada(venta);

    setOpenModal(true);
  };

  const cerrarModal = () => {
    setVentaSeleccionada(null);

    setOpenModal(false);
  };

  return (
    <>
      <TableContainer component={Paper} className="custom-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="22%">Empleado</TableCell>

              <TableCell width="18%">Sucursal</TableCell>

              <TableCell width="16%" align="center">
                Fecha
              </TableCell>

              <TableCell width="12%" align="center">
                Total
              </TableCell>

              <TableCell width="14%" align="center">
                Estado
              </TableCell>

              <TableCell width="14%">Pago</TableCell>

              <TableCell width="4%" align="center">
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ventas.map((venta) => (
              <TableRow key={venta?.id}>
                <TableCell>
                  <div className="venta-empleado">
                    <span className="empleado-nombre">
                      {venta?.empleado?.nombre}{" "}
                      {venta?.empleado?.apellidoPaterno}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{venta?.sucursal?.nombre}</TableCell>

                <TableCell align="center">
                  {new Date(venta?.fechaVenta)
                    .toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(",", "")}
                </TableCell>

                <TableCell align="center">
                  ${Number(venta?.total).toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <span
                    className={`estado-badge ${
                      venta?.cancelada ? "cancelada" : "activa"
                    }`}
                  >
                    {venta?.cancelada ? "Cancelada" : "Activa"}
                  </span>
                </TableCell>

                <TableCell>
                  {venta?.metodoPago === 1
                    ? "Efectivo"
                    : venta?.metodoPago === 2
                      ? "Tarjeta"
                      : venta?.metodoPago === 3
                        ? "Transferencia"
                        : "Desconocido"}
                </TableCell>

                <TableCell align="center">
                  <button
                    className="action-btn"
                    onClick={() => abrirModal(venta)}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalVenta
        open={openModal}
        onClose={cerrarModal}
        ventaId={ventaSeleccionada?.id}
      />
    </>
  );
}

export default TablaVentas;
