import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import CentersDetails from "./pages/CentersDetails";
import Branches from "./pages/Branches";
import Appointments from "./pages/Appointments";
import Resources from "./pages/Resources";
import CreateCenter from "./pages/CreateCenter";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/centers/:id" element={<CentersDetails />} />
        <Route path="/centers/:id/branches/:branchid" element={<Branches />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/createcenter" element={<CreateCenter />} />
      </Routes>
    </div>
  );
}

export default App;
