import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const CommentCard = (props) => {
  const { userImage, userName, comment, likes, timeStamp } = props;
  return (
    <summary className="flex gap-4">
      <img
        src={userImage}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
      <div className="flex flex-col w-full">
        <div className="flex gap-2 justify-between w-full">
          <p className="font-semibold text-textPrimary text-sm hover:text-gray-500 cursor-pointer">
            {userName}
          </p>
          <p className="text-textPrimary text-sm break-words flex-1">
            {comment}
          </p>
          <Icon icon="mdi:heart-outline" className="h-6 w-6 text-textPrimary" />
        </div>
        <div className="flex gap-2 text-xs">
          <p className="text-textSecondary">{timeStamp}</p>
          {likes && <p className="text-textSecondary">{likes} likes</p>}
        </div>
      </div>
    </summary>
  );
};

export default CommentCard;
