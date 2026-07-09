import { Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import { Login } from "./form/Login";
import { Register } from "./form/Register";
import FavoritesPage from "./pages/favorite/Index";
import ComparePage from "./pages/compare/Index";
import LogPage from "./pages/log/Index";
import HistoryPage from "./pages/history/Index";
import Settings from "./pages/settings/Settings";
import ErrorUrl from "./components/error/ErrorUrl";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/log" element={<LogPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<ErrorUrl />} />
    </Routes>
  );
};
export default Router;
