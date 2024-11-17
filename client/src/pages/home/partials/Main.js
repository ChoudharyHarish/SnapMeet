import React from "react";
import PostCard from "../../../components/Cards/PostCard";

const Main = () => {
  const posts = [
    {
      id: 1,
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
      timePosted: "2 hours ago",
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
      caption: "Had a great time at the beach!",
    },
    {
      id: 2,
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
      timePosted: "2 hours ago",
      images: [
        "https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/29187003/pexels-photo-29187003/free-photo-of-couple-strolling-through-a-vibrant-autumn-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/28830104/pexels-photo-28830104/free-photo-of-scenic-pathway-leading-to-arch-bridge-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      likes: 245,
      comments: 13,
      caption: "Had a great time at the beach!",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard {...post} />
      ))}
    </section>
  );
};

export default Main;
