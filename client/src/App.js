import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Page404 from "./components/Page404";
import Detail  from "./components/Detail";
import PageDev from "./components/PageInDev";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/:id" element={<Detail/>} />
        <Route path="*" element={<Page404 />} />
        <Route exact path="/favorites" element={<PageDev />} />
        <Route exact path="/library" element={<PageDev />} />
        <Route exact path="/premium" element={<PageDev />} />
      </Routes>
    </div>
  );
}
export default App;
