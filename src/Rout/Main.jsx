import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  HashRouter,
} from "react-router-dom";
import News from "../components/News/News";
import Price from "../components/Price/Price";
import Today from "../components/Today/Today";
import { LayOut } from "./layOut";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Home from "../components/home/Home";
import AccessDenied from "../components/AccessDenied/AccessDenied";
import ProtectedRoute from "../components/ProTectedRoute/ProTectedRoute";
import ProtectloginRoute from "./../components/ProtectLoginRoute/ProtectLoginRoute";
import Featured from "../components/Featured/Featured";
const Main = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<ProtectloginRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="" element={<LayOut />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dasboard" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/stock" element={<Price />} />
              <Route path="/analysis" element={<Today />} />
              <Route path="/featured" element={<Featured />} />
            </Route>
          </Route>
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route
            path="/not-found"
            element={<h1 className="text-white">Not found</h1>}
          />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default Main;
