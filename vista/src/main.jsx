import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./Utilidades/Redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
