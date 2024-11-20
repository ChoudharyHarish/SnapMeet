import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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
  const location = useLocation();
  const state = location.state;

  return (
    <>
      {/* Main Routes */}
      <Routes location={state?.background || location}>
        <Route element={<MainLayout expanded={true} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
        </Route>

        <Route element={<MainLayout expanded={false} addPadding={false} />}>
          <Route path="/inbox" element={<Message />} />
          <Route path="/chat/:receiverId" element={<Chat />} />
        </Route>

        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {state?.background && (
        <Routes>
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      )}
    </>
  );
}

export default App;
