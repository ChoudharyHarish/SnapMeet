import React from "react";

import Main from "./partials/Main";
import Suggested from "./partials/Suggested";

const Home = () => {
  return (
    <section className="flex p-4 md:px-0  justify-evenly w-full bg-background">
      <Main />
      <Suggested />
    </section>
  );
};

export default Home;
