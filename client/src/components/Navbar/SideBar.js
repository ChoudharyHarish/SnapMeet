import React from "react";

import ListItem from "./ListItem";
import { Images } from "../../assets";

const SideBar = (props) => {
  const list = [
    { name: "Home", icon: "material-symbols:home", to: "/home" },
    { name: "Search", icon: "material-symbols:search", to: "/search" },
    { name: "Explore", icon: "material-symbols:explore", to: "/explore" },
    { name: "Messages", icon: "fe:messanger", to: "/inbox" },
    { name: "Create", icon: "mdi:plus-box", to: "/create" },
    { name: "Profile", icon: "gg-profile", to: "/profile" },
  ];

  const { expanded } = props;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-background border-r border-border  transition-width duration-30 flex-col justify-between hidden md:flex ${
        expanded && "lg:w-64"
      }`}
    >
      <div>
        <div className="flex items-center cursor-pointer gap-2 p-4">
          <img
            src={Images.Logo}
            alt="Profile"
            className="w-10 h-10 object-contian"
          />
          {expanded && (
            <span className="hidden lg:block text-lg font-semibold text-textPrimary">
              SnapMeet
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {list.map((item) => (
            <ListItem {...item} expanded={expanded} />
          ))}
        </div>
      </div>

      <div>
        <ListItem
          name="Settings"
          icon="material-symbols:settings"
          expanded={expanded}
        />
        <ListItem
          name="Logout"
          icon="material-symbols:logout"
          expanded={expanded}
        />
      </div>
    </div>
  );
};

export default SideBar;
