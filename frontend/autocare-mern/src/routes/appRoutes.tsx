import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registerpage from "../components/Login";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registerpage />}></Route>
        <Route path="/login" element={<Registerpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
