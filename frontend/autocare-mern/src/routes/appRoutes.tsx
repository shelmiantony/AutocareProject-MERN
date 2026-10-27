import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import DashBoard from "../pages/Dashboard";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
