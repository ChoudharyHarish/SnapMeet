import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState, useCallback } from "react";
import videoSocket from "../socket/videoSocket";
import Peer from "../service/peer";

const Room = () => {
  const { roomId } = useParams();
  const { userId } = JSON.parse(localStorage.getItem("user"));

  const [remoteStream, setRemoteStream] = useState(null);
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

    videoSocket.subscribteToConnect(sendOffer);
    videoSocket.subscribeToOffer(acceptOffer);
    videoSocket.subscribeToAnswer(acceptAnswer);
    videoSocket.subscribeToIceCandidate(acceptCandidate);

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
      });
    },
    peer,
    remoteStream
  );

  return (
    <div className="flex">
      <video
        style={{ transform: "scaleX(-1)" }}
        ref={userVideoRef}
        autoPlay
        muted
      ></video>
      {remoteStream && (
        <video
          style={{ transform: "scaleX(-1)" }}
          ref={(video) => {
            if (video) {
              video.srcObject = remoteStream;
            }
          }}
          autoPlay
        ></video>
      )}
    </div>
  );
};

export default Room;
