import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Carousel from "../Carousel";
import UserCard from "./UserCard";
import Post from "../../pages/Post";
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

  const [isModalOpen, setModalOpen] = useState(false);

  const openPostModal = () => {
    navigate(`/post/${id}`);
    setModalOpen(true);
  };

  const closePostModal = () => {
    navigate("/");
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-white w-full max-w-xl mx-auto flex flex-col gap-2"
        style={{ borderBottom: "1px solid grey" }}
      >
        <UserCard
          userImage={userImage}
          userName={userName}
          timePosted={timePosted}
          className={styles.userCard}
        />

        <div className="relative border-2" style={{ borderWidth: "1px" }}>
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
            <Icon icon="mdi:heart-outline" className="h-6 w-6" />
            <Icon
              icon="basil:comment-outline"
              className="h-6 w-6 cursor-pointer"
              onClick={openPostModal}
            />
            <Icon icon="fluent:share-16-regular" className="h-6 w-6" />
          </div>
          <p className="font-medium text-gray-900">{likes} Likes</p>
          {caption && (
            <div className="flex gap-2">
              <p>{userName}</p>
              <p>{caption}</p>
            </div>
          )}
          {comments.length > 0 && (
            <div className="">
              <p
                className="cursor-pointer text-grey-500"
                onClick={() => openPostModal()}
              >
                View all {comments.length} comments
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Post
          userImage={userImage}
          userName={userName}
          images={images}
          likes={likes}
          timePosted={timePosted}
          comments={comments}
          caption={caption}
          closePostModal={closePostModal}
        />
      )}
    </>
  );
};

export default PostCard;
