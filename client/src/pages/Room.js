import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";

import videoSocket from "../socket/videoSocket";
import Peer from "../service/peer";

const Room = () => {
  const { roomId } = useParams();
  const { userId } = JSON.parse(localStorage.getItem("user"));

  const [remoteStream, setRemoteStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [peers, setPeers] = useState({});
  const userVideoRef = useRef();
  const peerRef = useRef(null);

  if (!peerRef.current) {
    peerRef.current = new Peer();
  }

  const peer = peerRef.current;

  const startSignalling = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    userVideoRef.current.srcObject = stream;
    peer.addStream(stream);
  }, [peer]);

  useEffect(() => {
    startSignalling();

    videoSocket.connect(roomId, userId);

    const sendOffer = async () => {
      const offer = await peer.createOffer();
      videoSocket.sendOffer(offer);
    };

    const acceptOffer = async (offer) => {
      const answer = await peer.acceptOffer(offer);
      videoSocket.sendAnswer(answer);
    };

    const acceptAnswer = async (answer) => {
      await peer.setLocalDescription(answer);
    };

    const acceptCandidate = async ({ candidate }) => {
      await peer.addIceCandidate(candidate);
    };

    const handleReceivedMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    videoSocket.subscribteToConnect(sendOffer);
    videoSocket.subscribeToOffer(acceptOffer);
    videoSocket.subscribeToAnswer(acceptAnswer);
    videoSocket.subscribeToIceCandidate(acceptCandidate);
    videoSocket.subscribeToMessages(handleReceivedMessage);

    return () => {
      videoSocket.disconnect();

      videoSocket.unsubscribeFromOffer(acceptOffer);
      videoSocket.unsubscribeFromAnswer(acceptAnswer);
      videoSocket.unsubscribeFromIceCandidate(acceptCandidate);
    };
  }, [roomId]);

  useEffect(
    () => {
      peer.onRemoteStream((stream) => {
        setRemoteStream(stream);
        setRemoteStreams((prevStreams) => [...prevStreams, stream]);
      });
    },
    peer,
    remoteStream
  );

  // new features
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const toggleMic = () => {
    const stream = userVideoRef.current.srcObject;
    const audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  };

  const toggleVideo = () => {
    const stream = userVideoRef.current.srcObject;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setVideoOn(videoTrack.enabled);
  };

  const handleHangup = () => {
    videoSocket.disconnect();
    window.location.href = "/";
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      videoSocket.sendMessage({
        roomId,
        message: { userName: "harish", text: newMessage },
      });
      setNewMessage("");
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      const tracks = screenStream.getTracks();
      tracks.forEach((track) => track.stop());
      setScreenStream(null);
    }
  };

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
        audio: true,
      });

      setScreenStream(screenStream);
      peer.addStream(screenStream);

      // If the user stops sharing the screen
      screenStream.getTracks().forEach((track) => {
        track.onended = () => {
          stopScreenSharing();
        };
      });
    } catch (error) {
      console.error("Error starting screen sharing: ", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex bg-black w-full">
        <div className="flex flex-col lg:flex-row w-1/2 h-full">
          <video
            className="border rounded-lg w-full"
            style={{ transform: "scaleX(-1)" }}
            ref={userVideoRef}
            autoPlay
            muted
          ></video>
          {remoteStream && (
            <video
              className="rounded-lg w-full"
              style={{ transform: "scaleX(-1)" }}
              ref={(video) => {
                if (video) {
                  video.srcObject = remoteStream;
                }
              }}
              autoPlay
            ></video>
          )}

          {screenStream && (
            <video
              className="rounded-lg w-full"
              style={{ transform: "scaleX(-1)" }}
              ref={(video) => {
                if (video) {
                  video.srcObject = screenStream;
                }
              }}
              autoPlay
            ></video>
          )}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2  flex gap-6 bg-gray-800 p-4 rounded-lg">
        <button onClick={toggleMic} className="text-white">
          <Icon icon={micOn ? "ic:round-mic" : "ic:round-mic-off"} width={28} />
        </button>
        <button onClick={toggleVideo} className="text-white">
          <Icon
            icon={videoOn ? "ic:baseline-videocam" : "ic:baseline-videocam-off"}
            width={28}
          />
        </button>
        <button onClick={startScreenSharing} className="text-white">
          <Icon icon="ic:round-screen-share" width={28} />
        </button>
        <button className="text-white">
          <Icon icon="emojione-v1:smiling-face-with-smiling-eyes" width={28} />
        </button>
        <button onClick={handleHangup} className="text-red-500">
          <Icon icon="ic:baseline-call-end" width={28} />
        </button>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="absolute bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        <Icon icon="ic:round-chat" width={28} />
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-300 flex flex-col transform transition-transform ${
          showChat ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">In-Call Chat</h2>
          <button
            onClick={() => setShowChat(!showChat)}
            className="text-gray-500"
          >
            <Icon icon="ic:round-close" width={28} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <p className="font-bold">{msg.userName}</p>
              {/* // add condition like userName like to curr then show you */}
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
