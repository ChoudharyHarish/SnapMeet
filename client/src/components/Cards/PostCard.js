import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from "../Carousel";
import { Icon } from "@iconify/react/dist/iconify.js";

const PostCard = (props) => {
  const { userImage, userName, timePosted, images, likes, comments, caption } =
    props;

  return (
    <div className="bg-white w-full max-w-xl mx-auto border-b-2 border-black">
      <div className="flex items-center px-2 py-4 ">
        <img
          src={userImage}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-900">{userName}</p>
          <p className="text-gray-500 text-sm">{timePosted}</p>
        </div>
      </div>

      <div className="relative border-2 ">
        {images.length > 1 ? (
          <Carousel images={images} />
        ) : (
          <img
            src={images[0]}
            alt="Post image"
            className="w-full h-96 object-cover rounded-t-lg"
          />
        )}
      </div>

      <div className="flex flex-col px-2 pt-4">
        <div className="flex gap-6">
          <Icon icon="mdi:heart-outline" className="h-6 w-6" />
          <Icon icon="basil:comment-outline" className="h-6 w-6" />
          <Icon icon="fluent:share-16-regular" className="h-6 w-6" />
        </div>
        <p className="font-medium text-gray-900">{likes} Likes</p>
      </div>

      {caption && (
        <div className="flex gap-2 px-2">
          <p>{userName}</p>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
