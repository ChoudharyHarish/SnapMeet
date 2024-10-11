import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserCard, MessageCard, Input, Button } from "../components";
import chatSocket from "../socket/chatSocket";

import { getMessages } from "../api/api";
import { signMessage } from "../utils/signMessage";
import { verifyMessage } from "../utils/verifySignature";

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

  return (
    <section className="w-[640px] mx-auto border-2 px-2">
      <UserCard name={name} />
      <div
        className="flex flex-col gap-3 overflow-y-auto"
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
  );
};

export default React.memo(Chats);
