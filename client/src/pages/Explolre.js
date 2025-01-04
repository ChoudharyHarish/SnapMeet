import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch active rooms (simulated for now)
  useEffect(() => {
    const fetchRooms = async () => {
      const mockRooms = [
        { id: 1, name: "FreeTalk1", users: 4 },
        { id: 2, name: "Dev Room", users: 10 },
        { id: 3, name: "Gaming Zone", users: 6 },
      ];
      setRooms(mockRooms);
    };

    fetchRooms();
  }, []);

  // Handle room navigation
  const handleRoomJoin = (room) => {
    navigate(`/rooms/${room.name}`);
  };

  const navigateRoom = () => {
    if (roomName) {
      navigate(`/rooms/${roomName}`);
    } else alert("Invalid Room Name");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 gap-8">
      <h1 className="text-4xl font-bold">Explore Rooms</h1>

      <div className="flex flex-col w-full md:w-3/4 xl:w-1/2 gap-6 border border-teal-500 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-6">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            className=" border rounded-lg p-3 flex-1 outline-none"
          />
          <button
            onClick={navigateRoom}
            className="bg-blue-500 text-white rounded-lg p-3"
          >
            Create / Join Room
          </button>
        </div>
        <button
          onClick={() => navigate("/random")}
          className="bg-green-500 text-white rounded-lg p-3"
        >
          Talk to a Random Stranger
        </button>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6 ">
        <h2 className="text-2xl font-semibold">Active Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="p-6 border rounded-lg shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{room.name}</h3>
                <p className="text-gray-500">{room.users} users online</p>
              </div>
              <button
                onClick={() => handleRoomJoin(room)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Join Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
