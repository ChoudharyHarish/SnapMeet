import React from "react";

const VideoPlayer = ({ videoSource }) => {
  return (
    <div className="video-container">
      <video width="100%" controls>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
