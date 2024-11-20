import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Carousel from "../Carousel";
import UserCard from "./UserCard";
import { Post } from "../../pages";
import styles from "./postCard.module.scss";

const PostCard = (props) => {
  const {
    id,
    userImage,
    userName,
    timePosted,
    images,
    likes,
    comments,
    caption,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      key={id}
      className="bg-background w-full max-w-xl mx-auto flex flex-col gap-2 border-b pb-2  border-border"
    >
      <UserCard
        userImage={userImage}
        userName={userName}
        timePosted={timePosted}
        className={styles.userCard}
      />

      <div className="relative p-1">
        {images.length > 1 ? (
          <Carousel images={images} height={"600px"} />
        ) : (
          <img
            src={images[0]}
            alt="Post image"
            className="w-full h-96 object-cover rounded-t-lg"
          />
        )}
      </div>

      <div className="flex flex-col px-4 md:px-2">
        <div className="flex gap-6">
          <Icon icon="mdi:heart-outline" className="h-6 w-6 text-textPrimary" />
          <Icon
            icon="basil:comment-outline"
            className="h-6 w-6 cursor-pointer text-textPrimary"
            onClick={() =>
              navigate(`/post/${id}`, { state: { background: location } })
            }
          />
          <Icon
            icon="fluent:share-16-regular"
            className="h-6 w-6 text-textPrimary"
          />
        </div>
        <p className="font-medium text-textSecondary">{likes} Likes</p>
        {caption && (
          <div className="flex gap-2">
            <p className="text-textPrimary">{userName}</p>
            <p className="text-textPrimary">{caption}</p>
          </div>
        )}
        {comments.length > 0 && (
          <div className="">
            <p
              className="cursor-pointer text-textSecondary"
              onClick={() =>
                navigate(`/post/${id}`, { state: { background: location } })
              }
            >
              View all {comments.length} comments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
