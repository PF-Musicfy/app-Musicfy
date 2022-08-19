import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';

import LandingPage from './components/LandingPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact path='/'
          element={<LandingPage />}
        />
        <Route
          exact path='/home'
          element={<Home />}
        />
      </Routes>
    </div>
  );
}
export default App;
