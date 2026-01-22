import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import InventoryManagement from "./pages/Inventory";
import NotFound from "./pages/OtherPage/NotFound";
import UserManagement from "./pages/User";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<InventoryManagement />} />
            <Route path="/manajemen-inventaris" element={<InventoryManagement />} />
            <Route path="/manajemen-pengguna" element={<UserManagement />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
