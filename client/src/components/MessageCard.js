import React from "react";

const MessageCard = (props) => {
  const { message, senderId, receiverId } = props;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`${
        user.userId === senderId
          ? "bg-green-500 ml-auto"
          : "bg-blue-400 mr-auto"
      } rounded-lg max-w-[320px] p-2`}
    >
      {message}
    </div>
  );
};

export default MessageCard;
