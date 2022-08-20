import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}
export default App;
