import React from "react";
import { Button } from "../../../components";
import styles from "./suggested.module.scss";

const UserItem = (props) => {
  const { userImage, userName } = props;
  return (
    <div className="flex items-center gap-2">
      <img
        src={userImage}
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="text-sm">
        <p className="text-textPrimary">{userName}</p>
        <p className="max-w-48 truncate text-textSecondary text-xs">
          Followed by Harish,Akash and 27more
        </p>
      </div>
      <Button name="Follow" className={`${styles.button} text-accent`} />
    </div>
  );
};

const Suggested = () => {
  const users = [
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
    },
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisad",
    },
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisade",
    },
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisadiy",
    },
  ];

  return (
    <section className="hidden xl:flex flex-col gap-4">
      <h1 className="text-2xl text-textPrimary">List of suggested users</h1>
      {users.map((user) => (
        <UserItem key={user.userName} {...user} />
      ))}
    </section>
  );
};

export default Suggested;
