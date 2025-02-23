import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from ".Navbar/components/Navbar";
import Login from ".Login/pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for 'username' in localStorage
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user); // Set login state based on whether 'username' exists in localStorage
  }, []);

  // Handle logging out
  const logout = () => {
    localStorage.removeItem("username"); // Remove user from localStorage
    setIsLoggedIn(false); // Update login state to false
  };

  return (
    <Router>
      {/* Pass logout function to Navbar if user is logged in */}
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        {/* Home route should be protected */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        {/* Redirect to Home if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
