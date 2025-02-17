import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/"); 
    } else {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, [navigate]);

  const memoizedUsername = useMemo(() => username, [username]);
  const handleLogout = useCallback(() => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("username");
    navigate("/"); 
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Welcome, {memoizedUsername}!</h2>
        <button onClick={handleLogout} className="btn btn-danger w-100 py-2">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
