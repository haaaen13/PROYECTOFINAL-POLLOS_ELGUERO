import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import TableToolbar from "../TableToolbar/TableToolbar";

import ProductoCard from "../ProductoCard/ProductoCard";

import Pagination from "../Pagination/Pagination";

import usePagination from "../../hooks/usePagination";

import ModalProducto from "./ModalProducto/ModalProducto";

import "./Productos.css";

import { listarProductos } from "../../Utilidades/Redux/Productos/ProductosAction";

function Productos() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const productos = useSelector((store) => store.productos.Productos);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase()),
  );

  const [openModal, setOpenModal] = useState(false);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const onClose = () => {
    setOpenModal(false);

    dispatch(listarProductos());
  };

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(productosFiltrados, 9);

  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  return (
    <div className="productos-page">
      <TableToolbar
        title="Productos"
        searchPlaceholder="Buscar producto..."
        buttonText="Agregar Producto"
        onSearch={(value) => {
          setSearch(value);

          resetPage();
        }}
        onAdd={() => {
          setProductoSeleccionado(null);
          setOpenModal(true);
        }}
      />

      <div className="productos-grid">
        {paginatedData.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onEdit={(producto) => {
              setProductoSeleccionado(producto);
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

      <ModalProducto
        open={openModal}
        onClose={onClose}
        producto={productoSeleccionado}
      />
    </div>
  );
}

export default Productos;
