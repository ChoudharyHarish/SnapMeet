import axios from "axios";

const url = "http://localhost:3001/api/v1";
// const url = "https://snap-meet.vercel.app/api/v1";
const Api = axios.create({ baseURL: url });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("access_token")) {
    req.headers.authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
  }
  return req;
});

const getMessages = (receiverId) => Api.get(`/chats/messages/${receiverId}`);

const getUsers = () => Api.get("/user/users");

const SignUp = (formData) => Api.post(`/auth/signup`, formData);
const LogIn = (formData) => Api.post(`/auth/signin`, formData);

export { getMessages, getUsers, SignUp, LogIn };
