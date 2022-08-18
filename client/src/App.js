import React from 'react';
import RegisterForm from './components/RegisterForm';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import NavBarLanding from './components/NavBarLanding';


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
        <Route
          exact path='/register'
          element={<RegisterForm/>}
        />
      </Routes>
    </div>
  );
}
export default App;
