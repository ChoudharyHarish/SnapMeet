import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const { _id, name, publicKey } = props;
  const navigate = useNavigate();
  return (
    <summary
      className="flex gap-4 cursor-pointer py-2 border-b-2"
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
      <div>
        <h2>{name}</h2>
      </div>
    </summary>
  );
};

export default UserCard;
