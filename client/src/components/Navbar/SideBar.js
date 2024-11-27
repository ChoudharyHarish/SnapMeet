import React from "react";

import ListItem from "./ListItem";
import { Images } from "../../assets";
import { useDispatch } from "react-redux";
import { toggleCreateModal } from "../../redux/authSlice";

const SideBar = (props) => {
  const list = [
    { name: "Home", icon: "material-symbols:home", to: "/home" },
    { name: "Search", icon: "material-symbols:search", to: "/search" },
    { name: "Explore", icon: "material-symbols:explore", to: "/explore" },
    { name: "Messages", icon: "fe:messanger", to: "/inbox" },
    {
      name: "Create",
      icon: "mdi:plus-box",
      onClick: () => dispatch(toggleCreateModal()),
    },
    { name: "Profile", icon: "gg-profile", to: "/profile" },
  ];

  const { expanded } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed z-100  h-full bg-background border-r border-border  transition-width duration-30 flex-col justify-between hidden md:flex ${
        expanded && "lg:w-60"
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
            <ListItem key={item.name} {...item} expanded={expanded} />
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
