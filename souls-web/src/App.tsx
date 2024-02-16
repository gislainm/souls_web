import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Authorization from "./pages/Authorization";
import Groups from "./pages/Groups";
import RequireAuth from "./components/RequireAuth";
import PersistentLogin from "./components/PesistentLogin";
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
          {/* Protected routes */}
          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/groups" element={<Groups />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          {/* Catch all route that takes you home everytime you try to access any url that doesn't exist */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
