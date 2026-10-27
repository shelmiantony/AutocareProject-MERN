import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Register from "../pages/auth/Register";
import DashBoard from "../pages/dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Sidebar from "../layouts/Sidebar";
import Customers from "../pages/customers/Customers";
import Vehicles from "../pages/vehicles/Vehicles";
import { Inventory, Report } from "@mui/icons-material";
import Appointments from "../pages/appointments/Appoinment";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute>
              <Sidebar />{" "}
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<DashBoard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
