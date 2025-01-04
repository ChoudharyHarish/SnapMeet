import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Carousel from "../Carousel";
import UserCard from "./UserCard";
import { Post } from "../../pages";
import { timeSince } from "../../utils/convertData";
import { useLikePostMutation } from "../../redux/postApiSlice";
import VideoPlayer from "../VideoPlayer";

const PostCard = (props) => {
  const {
    _id,
    creatorId,
    userImage,
    userName,
    images,
    video,
    createdAt,
    description,
    likes,
    comments,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const [likePost] = useLikePostMutation();

  return (
    <div
      key={_id}
      className="w-4/5  max-w-xl mx-auto flex flex-col gap-2 border-b py-4 border-border"
    >
      <UserCard
        id={creatorId}
        userImage={userImage}
        userName={userName}
        timePosted={timeSince(createdAt)}
        className="px-3"
      />

      {images.length > 0 && (
        <div className="relative px-2">
          {images.length > 1 ? (
            <Carousel images={images} className="rounded-lg" />
          ) : (
            <img
              src={images[0].url}
              alt="Post image"
              className="w-full h-96 object-cover rounded-t-lg"
            />
          )}
        </div>
      )}

      {video && <VideoPlayer videoSource={video.url} />}

      <div className="flex flex-col  px-4 md:px-2">
        <div className="flex gap-4">
          <Icon
            icon="mdi:heart-outline"
            className="h-6 w-6 text-textPrimary cursor-pointer"
            onClick={() => likePost(_id)}
          />
          <Icon
            icon="basil:comment-outline"
            className="h-6 w-6 cursor-pointer text-textPrimary"
            onClick={() =>
              navigate(`/post/${_id}`, { state: { background: location } })
            }
          />
          <Icon
            icon="fluent:share-16-regular"
            className="h-6 w-6 text-textPrimary"
          />
        </div>
        <p className="font-medium text-textSecondary">{likes} Likes</p>
        {description && (
          <div className="flex-1">
            <p className="text-textPrimary inline mr-2">{userName}</p>
            <p className="text-textPrimary inline break-words">{description}</p>
          </div>
        )}
        {comments > 0 && (
          <div className="">
            <p
              className="cursor-pointer text-textSecondary"
              onClick={() =>
                navigate(`/post/${_id}`, { state: { background: location } })
              }
            >
              View all {comments} comment{comments > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
