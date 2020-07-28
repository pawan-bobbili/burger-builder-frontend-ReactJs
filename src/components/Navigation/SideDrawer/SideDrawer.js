import React from "react";

import styles from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let displayclass = "Open";
  if (!props.show) {
    displayclass = "Close";
  }
  return (
    <Auxilary>
      <div className={[styles.SideDrawer, styles[displayclass]].join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <NavigationItems isAuth={props.isAuth} click={props.click} />
      </div>
      <div className={styles.Backdrop}>
        <Backdrop show={props.show} click={props.click} />
      </div>
    </Auxilary>
  );
};

export default SideDrawer;
