import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Page404 from "./components/Page404";
import Detail  from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/:id" element={<Detail/>} />
        <Route exact path="*" element={<Page404/>} />
      </Routes>
    </div>
  );
}
export default App;
