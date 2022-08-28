import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/index";
import axios from "axios";
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:5000";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

let persistor = persistStore(store)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
    </PersistGate>
  </Provider>
);
