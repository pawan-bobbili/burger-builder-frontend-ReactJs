import React from "react";

import Button from "../UI/Button/Button";
import styles from "./Address.module.css";

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  render() {
    const items = [];
    for (let key in this.props.address) {
      if (key !== "id") {
        items.push(
          <p key={key}>
            <strong>{key}</strong>: {this.props.address[key]}{" "}
          </p>
        );
      }
    }
    return (
      <div
        className={styles.Address}
        key={this.props.keys}
        style={{ display: this.state.disabled ? "none" : "block" }}
      >
        {items}
        <Button
          type="Success"
          click={() => {
            if (!this.state.disabled) {
              this.props.edit();
            }
          }}
        >
          EDIT
        </Button>
        <Button
          type="Danger"
          click={() => {
            if (!this.state.disabled) {
              this.props.delete();
              this.setState({ disabled: true });
            }
          }}
        >
          REMOVE
        </Button>
      </div>
    );
  }
}

export default Address;
