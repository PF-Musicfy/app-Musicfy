import React from 'react';
import RegisterForm from './components/RegisterForm';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact path='/'
          element={<LandingPage />}
        />
        <Route
          exact path='/register'
          element={<RegisterForm/>}
        />
        <Route
          exact path='/login'
          element={<Login/>}
        />
      </Routes>
    </div>
  );
}
export default App;
