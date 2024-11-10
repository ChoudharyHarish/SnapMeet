import { useNavigate, Link } from "react-router-dom";
import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

const ListItem = (props) => {
  const { name, icon, to, expanded, className } = props;
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center hover:bg-gray-100 cursor-pointer p-4 gap-4 ${className}`}
    >
      <Icon icon={icon} className="h-7 w-7" onClick={() => navigate(to)} />
      {expanded && (
        <Link to={`${to}`} className="hidden lg:block">
          {name}
        </Link>
      )}
    </div>
  );
};

export default ListItem;
