import React from "react";

import ListItem from "./ListItem";

import styles from "./bottomBar.module.scss";

const BottomBar = () => {
  const list = [
    { name: "Home", icon: "material-symbols:home", to: "/home" },
    { name: "Explore", icon: "material-symbols:explore", to: "/explore" },
    { name: "Messages", icon: "fe:messanger", to: "/inbox" },
    { name: "Create", icon: "mdi:plus-box", to: "/create" },
    { name: "Profile", icon: "gg-profile", to: "/profile" },
  ];

  return (
    <section className="md:hidden fixed bottom-0 flex border-t border-border   w-full justify-between px-8 py-3 bg-background">
      {list.map((item) => (
        <ListItem {...item} key={item.name} className={styles.item} />
      ))}
    </section>
  );
};

export default BottomBar;
