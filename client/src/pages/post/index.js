// a post page will show post and on right side show comments
// and below some suggested posts
import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

import Carousel from "../../components/Carousel";
import UserCard from "../../components/Cards/UserCard";
import CommentCard from "../../components/Cards/CommentCard";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch post data from id;

  const { images, userImage, userName, timePosted, caption, likes, comments } =
    {
      id: 1,
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
      timePosted: "2 hours ago",
      caption: "Good picture",
      images: [
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/29187003/pexels-photo-29187003/free-photo-of-couple-strolling-through-a-vibrant-autumn-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/28830104/pexels-photo-28830104/free-photo-of-scenic-pathway-leading-to-arch-bridge-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      likes: 245,
      comments: [
        {
          userName: "Harish",
          comment: "Good Post",
          likes: 20,
          timeStamp: "2hr",
          userImage:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          userName: "Harish",
          comment: "Good Post",
          likes: 20,
          timeStamp: "2hr",
          userImage:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          userName: "Harish",
          comment: "Good Post",
          likes: 20,
          timeStamp: "2hr",
          userImage:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          userName: "Harish",
          comment: "Good Post",
          likes: 20,
          timeStamp: "2hr",
          userImage:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    };

  const closePostModal = () => navigate(-1);

  return (
    <section
      className="fixed top-0 left-0 w-full bg-black/70 z-[10000] overflow-scroll h-screen flex justify-center px-4 py-8 md:p-8"
      onClick={closePostModal}
    >
      <div
        className="flex flex-col lg:flex-row h-full lg:w-4/5 xl:w-auto  border-2 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-background max-w-[500px]">
          {images.length > 1 ? (
            <Carousel images={images} height={"100%"} />
          ) : (
            <img
              src={images[0]}
              alt="Post image"
              className="w-full object-cover rounded-t-lg "
            />
          )}
        </div>
        <div className="bg-background h-full p-4 flex-1 xl:w-[400px]">
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
