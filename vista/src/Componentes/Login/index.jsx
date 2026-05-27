import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { iniciarSesion } from "../../Utilidades/Redux/Login/LoginAction";

import loginImage from "../../assets/img_login.jpg";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setCredenciales((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick() {
    const result = await dispatch(iniciarSesion(credenciales));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/empleados");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-image-section">
          <img src={loginImage} alt="POS Login" />

          <div className="image-overlay">
            <h1>Gestiona tu negocio</h1>
            <p>Controla ventas, productos y empleados desde un solo lugar.</p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-content">
            <h2>Bienvenido de nuevo</h2>
            <span>Inicia sesión en tu cuenta</span>

            <div className="input-group">
              <label>Usuario</label>

              <input
                type="text"
                name="username"
                placeholder="Ingresa tu usuario"
                value={credenciales.username}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>

              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={credenciales.password}
                onChange={handleChange}
              />
            </div>

            <button className="login-button" onClick={handleClick}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
