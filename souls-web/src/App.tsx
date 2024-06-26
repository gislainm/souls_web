import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Authorization from "./pages/Authorization";
import Groups from "./pages/Groups";
import RequireAuth from "./components/RequireAuth";
import RequireAuthLeader from "./components/RequireAuthLeader";
import PersistentLogin from "./components/PesistentLogin";
import PersistentLoginLeader from "./components/PersistentLoginLeader";
import Dashboard from "./pages/Dashboard";
import LeaderGroups from "./pages/LeadersGroups";
import RecordAttendance from "./pages/RecordAttendance";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authorize/:uuid" element={<Authorization />} />
          {/* Protected routes Group Leader */}
          <Route element={<PersistentLoginLeader />}>
            <Route element={<RequireAuthLeader />}>
              <Route path="/:uuid/groups" element={<LeaderGroups />} />
              <Route
                path="/:uuid/group/:group-name"
                element={<RecordAttendance />}
              />
            </Route>
          </Route>
          {/* Protected routes Admin */}
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
