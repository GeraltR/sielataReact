import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import RegisterModels from "./pages/RegisterModels";

function App() {
  return (
    <div className="min-h-screen bg-[#FFF6ED]">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registermodels" element={<RegisterModels />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
