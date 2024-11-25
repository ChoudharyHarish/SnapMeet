// main messages page here will show list of user which are friend of curr_user
// can click on any chat and chat page will open where chatting can be done along with feature of video calling
// can send post, text message,sticker, audio message, pdf.
// with message unsend functionality

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import { UserChatCard } from "../components";
import { getUsers } from "../api/api";
import { Images } from "../assets";

const Message = () => {
  // for temporary purpose just fetch from database and show all users of db

  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data.data);
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex gap-8 lg:max-w-3/4 bg-background text-textPrimary">
      <div className="md:border-r border-border w-[300px]">
        <div className="fixed  px-6 py-4 border-border border-r border-l  top-0 bg-background flex items-center justify-between  gap-6 text-xl w-[300px] leading-none">
          <h2>harishchoudhary_17</h2>
          <Icon icon="uil:edit" className="" />
        </div>
        <div className="pt-14 flex flex-col gap-2">
          <h2 className="px-6">Messages</h2>
          <div className="h-screen overflow-scroll  flex gap-2 flex-col">
            {users?.map((user) => (
              <UserChatCard {...user} lastMessage="hi harish" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  flex-1">
        <img
          src={Images.Messaging}
          className="max-w-[200px] h-auto -translate-y-1/2"
          alt=""
        />
        <p className="-translate-y-1/2">Start Messaging Now</p>
      </div>
    </div>
  );
};

export default Message;
