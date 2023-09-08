import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import socket from "../socket/socketIO";
import { useAuthState } from "../auth/authContext";
import airhorn from "../../audio/airhorn.wav";

const Chat = () => {
  const {
    state: { user }
  } = useAuthState();
  const [chatMessages, setChatMessages] = useState([]);
  const bottomOfBox = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    socket.emit("connected", user);

    socket.on("message Received", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);

      if (
        audioRef.current &&
        message.type === "reaction" &&
        message.message.includes("air horn")
      ) {
        audioRef.current.volume = 0.2;
        if (!audioRef.current.paused) {
          audioRef.current.currentTime = 0;
        } else {
          audioRef.current.play();
        }
      }
    });

    return () => {
      socket.off("message Received");
    };
  }, []);

  useEffect(() => {
    bottomOfBox.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="ui segment chat-box">
      <div className="chat-messages">
        {chatMessages.map((messageObject, index) => (
          <ChatMessage
            messageObject={messageObject}
            key={index}
          />
        ))}
        <div ref={bottomOfBox}></div>
      </div>
      <ChatInput user={user} />
      <audio
        ref={audioRef}
        src={airhorn}
      />
    </div>
  );
};

export default Chat;
