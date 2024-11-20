import React from "react";
import UserDetails from "./partials/UserDetails";
import UserPosts from "./partials/UserPosts";

const Profile = () => {
  // fetch user details from this id;

  return (
    <section className="flex flex-col gap-8 p-4 md:px-0 md:w-4/5 xl:w-2/3  mx-auto ">
      <UserDetails />
      <div className="border-b border-border"></div>
      <UserPosts />
    </section>
  );
};

export default Profile;
