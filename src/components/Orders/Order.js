import React from "react";

import styles from "./Order.module.css";

const Order = (props) => {
  const orderIng = [];
  for (let ing in props.ingredients) {
    if (+props.ingredients[ing] !== 0) {
      orderIng.push(
        <p key={ing} className={styles.Ingredients}>
          <strong>{ing}</strong>: {+props.ingredients[ing]}
        </p>
      );
    }
  }

  const info = [];
  for (let key in props.info) {
    if (key !== "delieveryMethod") {
      info.push(
        <p key={key}>
          <strong>{key}</strong>: {props.info[key]}
        </p>
      );
    }
  }

  return (
    <div className={styles.Order}>
      <fieldset style={{ textAlign: "left", marginBottom: "10px" }}>
        <legend style={{ textAlign: "left" }}>Customer Info</legend>
        {info}
      </fieldset>
      <fieldset style={{ textAlign: "center" }}>
        <legend style={{ textAlign: "left" }}>Ingredients</legend>
        {orderIng}
      </fieldset>
      <p>
        <strong>DelieveryMethod</strong>: {props.info.delieveryMethod}
      </p>
      <p>
        <strong>Price</strong>: {props.price}
      </p>
    </div>
  );
};

export default Order;
