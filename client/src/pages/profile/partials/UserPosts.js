import React from "react";
import { useParams } from "react-router-dom";

import UserPost from "./UserPost";

const UserPosts = () => {
  const { userName } = useParams();

  // fetch only userPosts
  const userPosts = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      likes: 245,
      comments: 11,
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      likes: 245,
      comments: 11,
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      likes: 245,
      comments: 11,
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      likes: 245,
      comments: 11,
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      likes: 245,
      comments: 11,
    },
  ];
  return (
    <div className=" gap-4 grid  grid-cols-2 md:grid-cols-3 ">
      {userPosts.map((post) => (
        <UserPost {...post} />
      ))}
    </div>
  );
};

export default UserPosts;
