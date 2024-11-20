import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";

const UserDetails = () => {
  const { userName } = useParams();

  // Fetch only user details
  const details = {
    name: "Harish Choudhary",
    userImage:
      "https://media.licdn.com/dms/image/v2/D5603AQEKdUM_HQ8hKg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666962665115?e=1737590400&v=beta&t=QVv6ZICG-dKxP8wXMRzTbl_3Hdh0kg9wFfPkJLnzFKw",
    userName: "harishchoudhary_17",
    posts: 2,
    followers: 285,
    following: 285,
    bio: "Winter is Coming 🐺\nIIITK'25\ncinephile",
  };

  return (
    <section className="flex flex-col  gap-4 lg:flex-row lg:items-center">
      <div className="flex gap-8">
        <img
          src={details.userImage}
          alt="User-image"
          className="w-20 h-20 lg:h-40 lg:w-40 rounded-full"
        />
        <div className="flex lg:hidden items-center gap-6">
          <p className="text-textPrimary text-lg">{details.userName}</p>
          <Button
            name="Edit Profile"
            className="bg-textSecondary text-background  text-sm p-2 rounded-lg"
          />
        </div>
      </div>

      <summary className="flex flex-col gap-6 lg:ml-20">
        <div className="hidden lg:flex items-center gap-6">
          <p className="text-textPrimary text-xl">{details.userName}</p>
          <Button
            name="Edit Profile"
            className="bg-textSecondary text-background text-sm  px-4 py-2 rounded-lg"
          />
          <Button
            name="Message"
            className="bg-textSecondary text-background  text-sm p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-12 lg:text-lg">
            <p className="text-textPrimary">{details.posts} posts</p>
            <p className="text-textPrimary">{details.followers} followers</p>
            <p className="text-textPrimary">{details.following} following</p>
          </div>
          <div>
            <p>{details.name}</p>
            {details.bio.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </summary>
    </section>
  );
};

export default UserDetails;
