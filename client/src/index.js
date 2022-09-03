// import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import store from "./store/index";

import axios from "axios";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";;

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:5000";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    {/* </StrictMode> */}
  </Provider>
);
