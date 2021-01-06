import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Message({ timestamp, user, message }) {
  const loggedUser = useSelector(selectUser);

  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div class="message__info">
        <h4>
          {user.displayName}
          <span class="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
      {loggedUser.uid === user.uid ? (
        <>
          <DeleteIcon className="message__deleteIcon" />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Message;
