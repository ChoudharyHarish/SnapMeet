import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserChatCard, MessageCard, Input, Button } from "../components";
import chatSocket from "../socket/chatSocket";

import { getMessages, getUsers } from "../api/api";
import { signMessage } from "../utils/signMessage";
import { verifyMessage } from "../utils/verifySignature";

import { Images } from "../assets";

const Chats = () => {
  const { receiverId } = useParams();
  const { name, receiverPublicKey } = useLocation().state;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // const { user } = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(receiverId);
      setMessages(response.data.data);
    };

    const handleMessage = ({ message, signature, receiverId, senderId }) => {
      const publicKey =
        user.userId === senderId ? user.publicKey : receiverPublicKey;
      const isValid = verifyMessage(message, signature, publicKey);
      if (isValid) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, senderId, receiverId },
        ]);
      }
    };

    if (user.userId) {
      chatSocket.connect(user.userId, receiverId);
      chatSocket.subscribeToMessages(handleMessage);
    }

    fetchMessages();
    return () => {
      chatSocket.unsubscribeFromMessages(handleMessage);
      chatSocket.disconnect();
    };
  }, [user.userId, receiverId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    try {
      const signature = signMessage(message, user.privateKey);

      chatSocket.sendMessage({
        message,
        signature,
        receiverId,
        senderId: user.userId,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <div className="flex gap-8 lg:max-w-3/4 border-2">
        <div className="md:border-r w-[300px]">
          <div className="fixed px-6 py-4 border-r top-0 bg-background flex items-center justify-between  w-[300px]  gap-6 text-xl  leading-none">
            <h2>harishchoudhary_17</h2>
            <Icon icon="uil:edit" className="" />
          </div>
          <div
            className="pt-14 flex flex-col gap-2 overflow-y-scroll"
            style={{ height: "calc(100vh - 10px)" }}
          >
            <h2 className="px-6">Messages</h2>
            <div className=" overflow-scroll  flex gap-2 flex-col">
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
              {users?.map((user) => (
                <UserChatCard {...user} lastMessage="hi harish" />
              ))}
            </div>
          </div>
        </div>
        <section className="w-3/4 mx-auto  px-2 h-screen overflow-scroll">
          <UserChatCard name={name} />
          <div className="border-b"></div>
          <div
            className="flex flex-col gap-3 overflow-y-auto pt-2"
            style={{ height: "calc(100vh - 125px)" }}
          >
            {messages?.map((message, index) => (
              <div ref={index === messages.length - 1 ? messagesEndRef : null}>
                <MessageCard {...message} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Enter your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              icon={
                <Icon
                  icon="ic:round-send"
                  className="bg-green-500 rounded-full p-2 text-white"
                  style={{ fontSize: "36px" }}
                />
              }
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(Chats);
