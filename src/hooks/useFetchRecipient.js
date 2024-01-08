import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";
import { baseURL } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setrecipientUser] = useState(null);
  const [error, setError] = useState(null);

  //   console.log(user);
  //   //   console.log(recipientId);
  //   console.log(chat);

  const recipientId = chat?.members?.find((id) => id !== user?.userID);

  useEffect(() => {
    // console.log(recipientId);
    const getUser = async () => {
      if (!recipientId) {
        return null;
      }

      const res = await getRequest(`${baseURL}/user/find/${recipientId}`);

      if (res.error) {
        return setError(res);
      }
      //   console.log(res);
      setrecipientUser(res);
    };

    getUser();
  }, [recipientId]);
  //   console.log(recipientUser);
  return { recipientUser };
};
