import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableToolbar from "../TableToolbar/TableToolbar";
import "../TableToolbar/TableToolbar.css";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

import { listarMisVentas } from "../../Utilidades/Redux/Ventas/VentasAction";
import TablaVentas from "../TablaVentas/TablaVentas";

function MisVentas() {
  const dispatch = useDispatch();

  const ventas = useSelector((store) => store.ventas.Ventas);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(listarMisVentas());
  }, [dispatch]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(ventas, 10);

  return (
    <>
      <div className="tabla-container">
        <TableToolbar
          title="Mis ventas"
          searchPlaceholder="Buscar Venta..."
          buttonText="xd"
          onSearch={(value) => {
            setSearch(value);

            resetPage();
          }}
          onAdd={() => setOpenModal(true)}
          showButton={false}
        />

        <TablaVentas ventas={paginatedData} />
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

export default MisVentas;
