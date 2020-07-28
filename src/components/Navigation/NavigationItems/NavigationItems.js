import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Auxilary from "../../../hoc/Auxilary/Auxilary";

const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" click={props.click}>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <Auxilary>
        <NavigationItem link="/orders" click={props.click}>
          Orders
        </NavigationItem>
        <NavigationItem link="/logout" click={props.click}>
          Logout
        </NavigationItem>
        <NavigationItem link="/addresses" click={props.click}>
          Addresses
        </NavigationItem>
      </Auxilary>
    ) : (
      <NavigationItem link="/authenticate" click={props.click}>
        Authenticate
      </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
