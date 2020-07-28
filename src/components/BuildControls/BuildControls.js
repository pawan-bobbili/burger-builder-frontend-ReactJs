import React from "react";

import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const buildControls = (props) => {
    // console.log(props.purchaseable)
  return (
    <div className={classes.BuildControls}>
    <strong>Price : {props.price.toFixed(2)}$</strong>
      {controls.map((ig) => (
        <BuildControl
          key={ig.label}
          type={ig.type}
          label={ig.label}
          addIg={() => props.addIngredient(ig.type)}
          removeIg={() => props.removeIngredient(ig.type)}
          disable = {props.disabledInfo[ig.type]}
        />
      ))}
      <button className = {classes.OrderButton} disabled={!props.purchaseable} onClick={props.clicked}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
