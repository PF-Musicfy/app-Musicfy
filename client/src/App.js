import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import LandingPage from './components/LandingPage'

function App() {
  return (
    <div className="App">
      La app esta funcionando con el store incluido.
      <NavBarLanding />
      <Routes>
        <Route
          exact path='/'
          element={<LandingPage />}
        />
      </Routes>
    </div>
  );
}
export default App;
