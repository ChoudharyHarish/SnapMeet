import axios from "axios";

const url = process.env.REACT_APP_API_URL;
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
