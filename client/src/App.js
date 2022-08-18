import RegisterForm from './components/RegisterForm';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage'


function App() {
  return (
    <div className="App">    
      <RegisterForm/>
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
