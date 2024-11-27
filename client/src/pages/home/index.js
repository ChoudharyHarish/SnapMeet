import React from "react";

import Main from "./partials/Main";
import Suggested from "./partials/Suggested";

const Home = () => {
  return (
    <section className="flex justify-evenly w-full bg-background">
      <Main />
      <Suggested />
    </section>
  );
};

export default Home;
