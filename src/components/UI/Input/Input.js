import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const classes = [styles.InputElement];
  if (props.touched && !props.valid) {
    classes.push(styles.Invalid);
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          className={classes.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "texarea":
      inputElement = (
        <textarea
          className={classes.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={classes.join(" ")} onChange={props.change}>
          {props.config.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayname}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.change}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
