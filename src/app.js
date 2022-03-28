import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import authContext from "./contextes/authContext";
import LandingPage from "./components/LandingPage/LandingPage";
import GuestNavbar from "./components/Navbar/GuestNavbar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";

const AuthRoutes = (
  <Navbar>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Navbar>
);

const NoAuthRoutes = (
  <GuestNavbar>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Navigate to="/signin" />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </GuestNavbar>
);

export default function App() {
  const { user } = useContext(authContext);

  return <BrowserRouter>{!user ? NoAuthRoutes : AuthRoutes}</BrowserRouter>;
}
