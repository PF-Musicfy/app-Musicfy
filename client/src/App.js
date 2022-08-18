import React from 'react';
import {Route, Routes} from 'react-router-dom';

import LandingPage from './components/LandingPage'

//<NavBarLanding />
function App() {
  return (
    <div className="App">
      La app esta funcionando con el store incluido.
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
