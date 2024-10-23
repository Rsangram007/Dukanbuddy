import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { useAuth } from "./context/AuthContext";
import Register from "./components/Register/Register";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AuthForm from "./components/AuthFrom/Authfrom";
import GoogleRedirectHandler from './components/AuthFrom/GoogleRedirectHandler';
import Product from './components/Product/Product';
function App() {
  const [user, setUser] = useState(null);
  const { handleLogin } = useAuth();
  const email = useSelector((state) => state.forgot.email);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:5050/account", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          handleLogin(response.data); // Login using response data
          setUser(response.data); // Update user state based on token
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      })();
    } else {
      // Display toast message if no token
      toast.error("You are not authenticated!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUser(null); // Ensure user state is null if no token
    }
  }, [handleLogin]);

  return (
    <div className="App">
      <ToastContainer /> {/* Toast container for notifications */}
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />

        <Route path="/google-callback" element={<GoogleRedirectHandler />} />
        <Route path="/product" element={<Product />} />
        {email.length > 0 && (
          <Route path="/reset-password" element={<ResetPassword />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

