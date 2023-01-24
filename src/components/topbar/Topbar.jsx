import React from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate()
  const hanldeLogout=()=>{
    localStorage.clear()
    navigate('/')
  }


  const hanldeCreateNewAdmin =()=>{
    navigate('/signup')
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Panel</span>
        </div>
        <div className="topRight">
        <button className="btn-logout" onClick={()=>hanldeCreateNewAdmin()}>Create New Admin</button>
          <button className="btn-logout" onClick={()=>hanldeLogout()}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
