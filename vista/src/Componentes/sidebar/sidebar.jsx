import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Package,
  Store,
  ShoppingCart,
  LogOut,
  Clock3,
  Monitor,
  ReceiptText,
  Wallet,
  ClipboardCheck,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { cerrarSesion } from "../../Utilidades/Redux/Login/LoginAction";

import "./Sidebar.css";

function Sidebar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(cerrarSesion());

    navigate("/");
  };

  const menuAdmin = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Ventas",
      path: "/ventas",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Turnos Activos",
      path: "/turnos",
      icon: <Clock3 size={20} />,
    },
    {
      name: "Productos",
      path: "/productos",
      icon: <Package size={20} />,
    },
    {
      name: "Empleados",
      path: "/empleados",
      icon: <Users size={20} />,
    },
    {
      name: "Sucursales",
      path: "/sucursales",
      icon: <Store size={20} />,
    },
  ];

  const menuEmpleado = [
    {
      name: "POS",
      path: "/pos",
      icon: <Monitor size={20} />,
    },
    {
      name: "Mis Ventas",
      path: "/mis-ventas",
      icon: <ReceiptText size={20} />,
    },
    {
      name: "Caja",
      path: "/caja",
      icon: <Wallet size={20} />,
    },
    {
      name: "Cierre",
      path: "/cierre",
      icon: <ClipboardCheck size={20} />,
    },
  ];

  const usuario = useSelector((state) => state.auth.usuario);

  const menu = usuario?.role === "Admin" ? menuAdmin : menuEmpleado;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Pollos El Güero</h2>
      </div>

      <nav className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <div className="sidebar-icon">{item.icon}</div>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
