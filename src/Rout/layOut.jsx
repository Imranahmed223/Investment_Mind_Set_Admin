import React, { useState } from "react";
//  importing components
import SideMenu from "../components/SideMenu/SideMenu";
import Topbar from "../components/topbar/Topbar";

import { Outlet } from "react-router-dom";
export const LayOut = () => {
  const [inactive, setInactive] = useState(false);

  return (
    <div>
      <Topbar />
      <div>
        <SideMenu inactive={inactive} setInactive={setInactive} />
      </div>
      <div
        style={{ width: inactive ? "calc(100vw-120px)" : "calc(100vw-220px)" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

// style={{ display: "flex" }}

// style={{ width: inactive ? "120px" : "220px" }}
