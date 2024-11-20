import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";

const UserPost = (props) => {
  const { id, image, likes, comments } = props;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <summary
      key={id}
      className="relative list-none cursor-pointer max-h-64"
      onClick={() =>
        navigate(`/post/${id}`, { state: { background: location } })
      }
    >
      <div className="hover:opacity-100 opacity-0 absolute bg-black/30 h-full w-full flex flex-col md:flex-row  gap-2 items-center justify-center">
        <div className="flex gap-2 text-white text-lg items-center font-extrabold">
          <Icon icon="mdi:heart-outline" className="text-2xl" />
          {likes}
        </div>
        <div className="flex gap-2 text-white text-lg items-center font-extrabold">
          <Icon icon="basil:comment-outline" className="text-2xl" />
          {comments}
        </div>
      </div>
      <img className="w-full h-full object-cover" src={image} alt="" />
    </summary>
  );
};

export default UserPost;
