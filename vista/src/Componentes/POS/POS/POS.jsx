import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import TableToolbar from "../../TableToolbar/TableToolbar";

import ProductoCard from "../../ProductoCard/ProductoCard";

import Pagination from "../../Pagination/Pagination";

import usePagination from "../../../hooks/usePagination";

import "./pos.css";

import { listarProductosActivos } from "../../../Utilidades/Redux/Productos/ProductosAction";

import PanelVenta from "../PanelVenta/PanelVenta";

function POS() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [carrito, setCarrito] = useState([]);

  /*
    Estado para backend
  */

  const [detalles, setDetalles] = useState([]);

  const productos = useSelector((store) => store.productos.Productos);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(productosFiltrados, 12);

  /*
    CARRITO UI
  */

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
              }
            : p,
        ),
      );

      return;
    }

    setCarrito([
      ...carrito,
      {
        ...producto,
        cantidad: 1,
      },
    ]);
  };

  /*
    DETALLES BACKEND
  */

  const agregarDetalle = (producto) => {
    const existe = detalles.find((d) => d.productoId === producto.id);

    if (existe) {
      setDetalles(
        detalles.map((d) =>
          d.productoId === producto.id
            ? {
                ...d,
                cantidad: d.cantidad + 1,
              }
            : d,
        ),
      );

      return;
    }

    setDetalles([
      ...detalles,
      {
        productoId: producto.id,

        cantidad: 1,
      },
    ]);
  };

  /*
    AGREGAR GENERAL
  */

  const agregarProducto = (producto) => {
    agregarAlCarrito(producto);

    agregarDetalle(producto);
  };

  /*
    CANCELAR
  */

  const onCancelar = () => {
    setCarrito([]);
    setDetalles([]);
  };

  useEffect(() => {
    dispatch(listarProductosActivos());
  }, [dispatch]);

  return (
    <div className="pos-layout">
      <div className="productos-disponibles">
        <TableToolbar
          title="Productos"
          searchPlaceholder="Buscar producto..."
          buttonText="Agregar Producto"
          onSearch={(value) => {
            setSearch(value);

            resetPage();
          }}
          onAdd={() => console.log("Agregar")}
          showButton={false}
        />

        <div className="productos-grid">
          {paginatedData.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEdit={(producto) => console.log("Editar", producto)}
              onDelete={(producto) => console.log("Eliminar", producto)}
              onClick={(producto) => agregarProducto(producto)}
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
      </div>

      <PanelVenta
        carrito={carrito}
        detalles={detalles}
        onCancelar={onCancelar}
      />
    </div>
  );
}

export default POS;
