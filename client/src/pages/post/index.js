// a post page will show post and on right side show comments
// and below some suggested posts
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

import Carousel from "../../components/Carousel";
import UserCard from "../../components/Cards/UserCard";
import CommentCard from "../../components/Cards/CommentCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetPostQuery,
  useLikePostMutation,
} from "../../redux/postApiSlice";

import { Button, Input } from "../../components";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPostQuery(id);
  const [addComment] = useAddCommentMutation();
  const [likePost] = useLikePostMutation();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (data && data.post) setPost(data.post);
  }, [data]);

  const closePostModal = () => navigate(-1);

  return (
    <section
      className="fixed top-0 left-0 w-full bg-black/70 z-[10000] overflow-scroll h-screen flex justify-center px-4 py-8 md:p-8"
      onClick={closePostModal}
    >
      {!isLoading && post ? (
        <div
          className="flex flex-col lg:flex-row h-full lg:w-4/5 xl:w-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-background max-w-[600px]">
            {post.images.length > 1 ? (
              <Carousel images={post.images} height={"100%"} />
            ) : (
              <img
                src={post.images[0].url}
                alt="Post image"
                className="w-full object-cover rounded-t-lg "
              />
            )}
          </div>
          <div className="bg-background h-full p-4 flex-1 xl:w-[400px]">
            <UserCard userImage={post.userImage} userName={post.userName} />
            <div className="border-b border-border my-2"></div>
            <div className="flex flex-col gap-5 h-[calc(100vh-280px)] overflow-auto">
              {post.description && (
                <CommentCard
                  userImage={post.userImage}
                  userName={post.userName}
                  createdAt={post.createdAt}
                  comment={post.description}
                />
              )}
              {post.comments.map((comment, i) => (
                <CommentCard key={i} {...comment} />
              ))}
            </div>
            <div className="border-b border-border my-2"></div>
            <div className="flex gap-4">
              <Icon
                icon="mdi:heart-outline"
                className="h-6 w-6 text-textPrimary cursor-pointer"
                onClick={() => likePost(id)}
              />
              <Icon
                icon="basil:comment-outline"
                className="h-6 w-6 cursor-pointer text-textPrimary"
              />
              <Icon
                icon="fluent:share-16-regular"
                className="h-6 w-6 text-textPrimary"
              />
            </div>
            {post.likes > 0}
            <p className="text-textPrimary text-sm mt-2">
              {post.likes} like{post.likes > 1}s{" "}
            </p>
            <div className="border-b border-border my-2"></div>
            <div className="flex items-center">
              <Input
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                name="Post"
                handleClick={() => {
                  addComment({ id, comment });
                  setComment("");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}

      <Icon
        icon="material-symbols:close"
        className="fixed top-0 right-0 md:top-4  md:right-10  text-4xl text-white"
        onClick={closePostModal}
      />
    </section>
  );
};

export default Post;
