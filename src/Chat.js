import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader.js";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import {
  selectChannelId,
  selectChannelName,
  setChannelInfo,
} from "./features/appSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const handleDeleteChannel = (e) => {
    if (
      window.confirm("Are you sure you want to delete #" + channelName + "?")
    ) {
      alert(`Successfully deleted #${channelName}`);
      db.collection("channels").doc(channelId).delete();
      dispatch(
        setChannelInfo({
          channelId: null,
          channelName: "",
        })
      );
    }
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div class="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div class="chat__input">
        <AddCircleIcon fontSize="medium" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div class="chat__inputIcons">
          <CardGiftIcon fontSize="medium" />
          <GifIcon fontSize="medium" />
          <EmojiEmotionsIcon fontSize="medium" />
          <DeleteForeverIcon onClick={handleDeleteChannel} fontSize="medium" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
