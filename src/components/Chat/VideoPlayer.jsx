import React, { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    leaveCall,
  } = useContext(SocketContext);

  return callAccepted || stream ? (
    <div
      onClick={leaveCall}
      style={{
        background: "#868686",
        width: "500px",
        height: "300px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
      }}
    >
      {stream && (
        <div
          style={{
            background: "#a5e061",
            width: "200px",
            height: "300px",
          }}
        >
          <video playsInline ref={myVideo}  autoPlay />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div
          style={{
            background: "#8d3f3f",
            width: "300px",
            height: "300px",
          }}
        >
          <video playsInline ref={userVideo} autoPlay controls={true} />
        </div>
      )}
      <button onClick={leaveCall}>Hang up</button>
    </div>
  ) : null
};

export default VideoPlayer;
