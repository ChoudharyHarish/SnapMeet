import React from "react";
import { useNavigate } from "react-router-dom";

const MessageCard = (props) => {
  const { message, senderId, receiverId, userImage } = props;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div
      className={`${
        user.userId === senderId ? "flex-row-reverse ml-auto" : "mr-auto"
      } flex gap-2 items-center w-fit `}
    >
      {user.userId !== senderId && (
        <img
          className="h-10 w-10 object-cover rounded-full cursor-pointer"
          onClick={() => navigate(`/profile/${receiverId}`)}
          src={userImage}
          alt="user-image"
        />
      )}
      <p
        className={`${
          user.userId === senderId
            ? "bg-[#3797F0] text-white"
            : "bg-bgSecondary"
        } p-2 rounded-2xl`}
      >
        {message}
      </p>
    </div>
  );
};

export default MessageCard;
