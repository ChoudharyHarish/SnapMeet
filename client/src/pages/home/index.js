import React from "react";

import Suggested from "./partials/Suggested";
import Main from "./partials/Main";

const Home = () => {
  return (
    <section className="flex justify-evenly w-full bg-background">
      <Main />
      <Suggested />
    </section>
  );
};

export default Home;
