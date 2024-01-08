import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  //   console.log(recipientUser);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">08/01/2024</div>
        <div className="this-user-notifications">1</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;
