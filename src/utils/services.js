export const baseURL = "https://chat-app-backend-xi-brown.vercel.app/api";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();
  // console.log(data);
  if (!res.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    console.log(message);
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  // console.log(data);
  if (!res.ok) {
    let message = "An error occured";
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    console.log(message);
    return { error: true, message };
  }
  return data;
};
