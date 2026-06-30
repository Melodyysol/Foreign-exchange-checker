import { Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import { Login } from "./form/Login";
import { Register } from "./form/Register";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default Router;
