import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const className = [styles.Button, styles[props.type]];
  if (props.disabled) {
    className.push(styles.Disabled);
  }
  return (
    <button
      onClick={props.click}
      className={className.join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
