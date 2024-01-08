import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  //   console.log(currentChat);
  //   console.log(messages);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getRequest(`${baseURL}/user/users`);
      //   console.log(res);
      if (res.error) {
        return console.log("Error fetching users", res);
      }

      const pchats = res.filter((u) => {
        let isChatCreated = false;
        if (user?.userID === u._id) {
          return false;
        }

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pchats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const res = await getRequest(`${baseURL}/message/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if (res.error) {
        return setMessagesError(res);
      }
      //   console.log(res);
      setMessages(res);
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getUSerChats = async () => {
      if (user?.userID) {
        setUserChatsError(null);
        setUserChatsLoading(true);
        const res = await getRequest(`${baseURL}/chat/${user?.userID}`);
        setUserChatsLoading(false);
        if (res.error) {
          return setUserChatsError(res);
        }
        setUserChats(res);
      }
    };
    getUSerChats();
  }, [user]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) {
        return console.log("You must type something");
      }
      const res = await postRequest(
        `${baseURL}/message`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender.userID,
          text: textMessage,
        })
      );
      if (res.error) {
        return setSendTextMessageError(res);
      }

      setNewMessage(res);
      setMessages((prev) => [...prev, res]);
      setNewMessage(null);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const res = await postRequest(
      `${baseURL}/chat`,
      JSON.stringify({ firstId, secondId })
    );
    if (res.error) {
      return console.log("Error creating chat", res);
    }
    setUserChats((prev) => [...prev, res]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
