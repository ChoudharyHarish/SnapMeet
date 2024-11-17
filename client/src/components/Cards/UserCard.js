import React from "react";

const UserCard = (props) => {
  const { userImage, userName, timePosted, className } = props;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={userImage}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-textPrimary">{userName}</p>
        {timePosted && (
          <p className="text-textSecondary text-sm">{timePosted}</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
