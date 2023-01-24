import React from "react";
import { Link } from "react-router-dom";

const MenuItem = (props) => {
  const { name, icon, to } = props;

  return (
    <>
      <li onClick={props.onClick}>
        <Link exact to={to} className="side_menu-top-menu-item">
          <div className="side_menu-top-menu-item-icon">{icon}</div>
          <h4 className="side_menu-top-menu-item-text">{name}</h4>
        </Link>
        <div className="divider"></div>
      </li>
    </>
  );
};

export default MenuItem;
