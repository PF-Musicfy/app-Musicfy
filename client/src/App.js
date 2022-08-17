import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        La app esta funcionando con el store incluido.
        <Route exact path="/" component={LandingPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
