import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/SignUp/SignUp";
import LoginPage from "./components/Login/Login";
import Main from './components/SideMenu/SideMenu'
import Dashboard from './components/home/Home'
import News from './components/News/News'
import Analysic from './components/Today/Today'
import Price from './components/Price/Price'
const APPROUTE = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/menu" element={<Main />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/price" element={<Price />}></Route>
        <Route path="/analycis" element={<Analysic />}></Route>
        <Route
          path="/not-found"
          element={<h1 className="text-white">Not found</h1>}
        />
        {/* <Route path="/access-denied" element={<AccessDenied />} /> */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
};

export default APPROUTE;
