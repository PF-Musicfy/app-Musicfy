import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Page404 from "./components/Page404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
