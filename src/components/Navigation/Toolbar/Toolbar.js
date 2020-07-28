import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";
import { useEffect } from "react";

const Toolbar = (props) => {
  useEffect(() => {
    //console.log('Toolbar');
  });
  return (
    <header className={styles.Toolbar}>
      <DrawerToggler click={props.click} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopNav}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default React.memo(Toolbar);
