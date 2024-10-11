import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Auth,
  Chat,
  Explore,
  Home,
  Message,
  Post,
  Profile,
  Room,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/inbox" element={<Message />} />
        <Route path="/chat/:receiverId" element={<Chat />} />
        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/post:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
