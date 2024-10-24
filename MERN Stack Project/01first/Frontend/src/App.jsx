import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Managers from "./pages/Managers";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/authSlice";
import MyTask from "./pages/MyTask";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();

  // Fetch user and token from sessionStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      dispatch(setCredentials({ user: storedUser, token: storedToken }));
    }

    setLoading(false); // Data has been fetched, stop loading
  }, [dispatch]);

  // Prevent rendering routes until we finish checking sessionStorage
  if (loading) {
    return <div>Loading...</div>; // Optional: show a loading spinner or placeholder
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {
          user && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/myTask" element={<MyTask />} />
            </>
          )
        }
        {user && user.role === "admin" ? (
          <>
            <Route path="/managers" element={<Managers />} />
            <Route path="/employees" element={<Employees />} />
          </>
        ) : null}

        {user && user.role === "manager" ? (
          <>
            <Route path="/employees" element={<Employees />} />
          </>
        ) : null}

        {/* {user && user.role === "employee" ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null} */}

        {/* Catch-all route */}
        {user && <Route path="*" element={<Navigate to="/home" />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
