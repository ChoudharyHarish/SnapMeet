import React from "react";

import Main from "./partials/Main";
import Suggested from "./partials/Suggested";

const Home = () => {
  return (
    <section className="flex w-full justify-around">
      <Main />
      <Suggested />
    </section>
  );
};

export default Home;
