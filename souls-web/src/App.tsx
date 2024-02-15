import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Authorization from "./pages/Authorization";
import Groups from "./pages/Groups";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authorize" element={<Authorization />} />
          <Route element={<RequireAuth />}>
            <Route path="/groups" element={<Groups />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
