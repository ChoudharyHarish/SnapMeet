// implement webrtc logic here
// it will show room which are currently active so user can join there and have video call with peers

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Explolre = () => {
  const [rooms, setRooms] = useState(null);
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();

  // first show roooms like free4talk, and then have a button for createroom and signup

  // useEffect(() => {

  // },[]);

  return (
    <div>
      <p> Explore</p>
      <div className="flex gap-4">
        <input
          type="text"
          name="room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="border-red-500 border-2 p-3 outline-none rounded-lg"
        />
        <button
          className="p-3 rounded-lg bg-red-500 outline-none"
          onClick={() => navigate(`/rooms/${roomName}`)}
        >
          Create Room
        </button>
        <button
          className="p-3 rounded-lg bg-red-500 outline-none"
          onClick={() => navigate(`/rooms/${roomName}`)}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Explolre;
