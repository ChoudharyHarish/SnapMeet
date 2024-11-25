import React from "react";
import { useNavigate } from "react-router-dom";

const UserChatCard = (props) => {
  const { _id, name, publicKey, lastMessage } = props;
  const navigate = useNavigate();
  return (
    <summary
      className="flex gap-4 cursor-pointer px-6 py-2 hover:bg-hover bg-background"
      onClick={() =>
        navigate(`/chat/${_id}`, {
          state: { name, receiverPublicKey: publicKey },
        })
      }
    >
      <figure>
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1718755200&semt=ais_user"
          alt=""
          className="rounded-full h-12 w-12"
        />
      </figure>
      <div className="flex flex-col justify-center">
        <h2 className="text-textPrimary">{name}</h2>
        <p className="text-textSecondary text-sm">{lastMessage}</p>
      </div>
    </summary>
  );
};

export default UserChatCard;
