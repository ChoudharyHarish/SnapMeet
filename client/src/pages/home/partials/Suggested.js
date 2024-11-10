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
        <p>{userName}</p>
        <p className="max-w-48 truncate text-gray-500">
          Followed by Harish,Akash and 27more
        </p>
      </div>
      <Button name="Follow" className={styles.button} />
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
      userName: "Mona Lisa",
    },
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
    },
    {
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      userName: "Mona Lisa",
    },
  ];

  return (
    <section className="hidden lg:flex flex-col gap-4">
      <h1 className="text-2xl">List of suggested users</h1>
      {users.map((user) => (
        <UserItem {...user} />
      ))}
    </section>
  );
};

export default Suggested;
