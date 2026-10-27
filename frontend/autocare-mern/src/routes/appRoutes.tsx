import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import DashBoard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Sidebar from "../layouts/SideBar";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route element={<Sidebar />}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
