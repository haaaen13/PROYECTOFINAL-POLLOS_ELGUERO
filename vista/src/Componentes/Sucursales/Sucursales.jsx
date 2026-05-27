import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import TableToolbar from "../TableToolbar/TableToolbar";

import SucursalCard from "./SucursalCard/SucursalCard";

import ModalSucursal from "./ModalSucursal/ModalSucursal";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

import "./Sucursales.css";

import { listarSucursales } from "../../Utilidades/Redux/Sucursales/SucursalesAction";

function Sucursales() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);

  const sucursales = useSelector((store) => store.sucursales.Sucursales);

  const sucursalesFiltradas = sucursales.filter((sucursal) =>
    sucursal.nombre.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(sucursalesFiltradas, 4);

  const onClose = () => {
    setOpenModal(false);
    dispatch(listarSucursales());
  };

  useEffect(() => {
    dispatch(listarSucursales());
  }, [dispatch]);

  return (
    <div className="sucursales-page">
      <TableToolbar
        title="Sucursales"
        searchPlaceholder="Buscar sucursal..."
        buttonText="Agregar Sucursal"
        onSearch={(value) => {
          setSearch(value);

          resetPage();
        }}
        onAdd={() => {
          setSucursalSeleccionada(null);

          setOpenModal(true);
        }}
      />

      <div className="sucursales-grid">
        {paginatedData.map((sucursal) => (
          <SucursalCard
            key={sucursal.id}
            sucursal={sucursal}
            onEdit={() => {
              setSucursalSeleccionada(sucursal);

              setOpenModal(true);
            }}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNext={nextPage}
        onPrev={prevPage}
      />

      <ModalSucursal
        open={openModal}
        onClose={onClose}
        sucursal={sucursalSeleccionada}
      />
    </div>
  );
}

export default Sucursales;
