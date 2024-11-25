import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const { id, userImage, userName, timePosted, className } = props;

  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center gap-3 ${className} cursor-pointer`}
      onClick={() => navigate(`/profile/${id}`)}
    >
      <img
        src={userImage}
        alt={userName}
        className="w-8 h-8 rounded-full object-cover"
      />

      <p className="font-semibold text-textPrimary text-sm">{userName}</p>
      {timePosted && <p className="text-textSecondary text-xs">{timePosted}</p>}
    </div>
  );
};

export default UserCard;
