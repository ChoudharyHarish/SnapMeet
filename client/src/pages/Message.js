// main messages page here will show list of user which are friend of curr_user
// can click on any chat and chat page will open where chatting can be done along with feature of video calling
// can send post, text message,sticker, audio message, pdf.
// with message unsend functionality

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import { UserCard } from "../components";
import { getUsers } from "../api/api";

const Message = () => {
  // for temporary purpose just fetch from database and show all users of db

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex gap-4 items-center">
        <h2>harishchoudhary_17</h2>
        <Icon icon="uil:edit" />
      </div>
      <h2>Messages</h2>
      {users?.map((user) => (
        <UserCard {...user} />
      ))}
    </>
  );
};

export default Message;
