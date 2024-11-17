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
  Search,
} from "./pages";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout expanded={true} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<MainLayout expanded={false} />}>
          <Route path="/inbox" element={<Message />} />
        </Route>

        <Route path="/chat/:receiverId" element={<Chat />} />
        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
