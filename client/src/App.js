import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
//import Page404 from "./components/Page404";
//import Detail from "./components/Detail";
import PageDev from "./components/PageInDev";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import Detail from "./components/Detail";
import Premium from "./components/Premium";
import About from "./components/About";

function App() {
  //<Route exact path="/:id" element={<Detail/>} />
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/home/:id" element={<Detail />} />
        <Route exact path="/favorites" element={<PageDev />} />
        <Route exact path="/library" element={<PageDev />} />
        <Route exact path="/premium" element={<Premium />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<PageDev />} />
      </Routes>
    </div>
  );
}
export default App;
