import React from "react";

import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import {
  MdOutlinePriceChange,
  MdOutlineFeaturedPlayList,
} from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";

import "./SideMenu.scss";
import MenuItem from "./MenuItem";

export const menuItems = [
  {
    name: "Dashboard",
    to: "/dasboard",
    icon: <AiOutlineDashboard />,
  },

  {
    name: "News",
    to: "/news",
    icon: <BiNews />,
  },
  {
    name: "Stock",
    to: "/stock",
    icon: <MdOutlinePriceChange />,
  },
  {
    name: "Analysis",
    to: "/analysis",
    icon: <TbDeviceAnalytics />,
  },
  {
    name: "Featured Video",
    to: "/featured",
    icon: <MdOutlineFeaturedPlayList />,
  },
];

const SideMenu = (props) => {
  // const [inactive, setInactive] = useState(false);

  return (
    <>
      <div
        className={`side_menu ${props.inactive ? "side_menu-inactive" : ""}`}
      >
        <div className="side_menu-top">
          <div
            onClick={() => props.setInactive(!props.inactive)}
            className="side_menu-top-toggle"
          >
            {props.inactive ? (
              <BsArrowRightSquareFill />
            ) : (
              <BsArrowLeftSquareFill />
            )}
          </div>

          <div className="side_menu-top-menu">
            <ul>
              {menuItems.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  name={menuItem.name}
                  to={menuItem.to}
                  icon={menuItem.icon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
