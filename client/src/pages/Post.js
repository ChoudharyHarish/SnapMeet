// a post page will show post and on right side show comments
// and below some suggested posts
import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

import Carousel from "../components/Carousel";
import UserCard from "../components/Cards/UserCard";
import CommentCard from "../components/Cards/CommentCard";

const Post = (props) => {
  const {
    userImage,
    userName,
    images,
    caption,
    comments,
    timePosted,
    closePostModal,
  } = props;

  return (
    <section
      className="fixed top-0 left-0 w-full bg-black/70 z-[10000] overflow-scroll h-screen flex justify-center px-4 py-8 md:p-8"
      onClick={closePostModal}
    >
      <div
        className="flex flex-col lg:flex-row h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-background max-w-[500px]  ">
          {images.length > 1 ? (
            <Carousel images={images} height={"100%"} />
          ) : (
            <img
              src={images[0]}
              alt="Post image"
              className="w-full object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="bg-background h-full p-4">
          <UserCard userImage={userImage} userName={userName} />
          <div className="border-b border-border my-2"></div>
          <div className="flex flex-col gap-5">
            {caption && (
              <CommentCard
                userImage={userImage}
                userName={userName}
                comment={caption}
                timeStamp={timePosted}
              />
            )}
            {comments.map((comment) => (
              <CommentCard {...comment} />
            ))}
          </div>
        </div>
      </div>

      <Icon
        icon="material-symbols:close"
        className="fixed top-0 right-0 md:top-4  md:right-10  text-4xl text-white"
        onClick={closePostModal}
      />
    </section>
  );
};

export default Post;
