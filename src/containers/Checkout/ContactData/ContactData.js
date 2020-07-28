import axios from "axios";
import React from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";
import { checkValidity } from "../../../shared/utitlity";
import ErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementtype: "input",
          config: {
            type: "text",
            placeholder: "Your Name",
          },
          rules: {
            required: true,
            minLen: 4,
            maxLen: 32,
          },
          value: "",
          valid: false,
          touched: false,
        },
        email: {
          elementtype: "input",
          config: {
            type: "email",
            placeholder: "Your E-Mail",
          },
          rules: {
            required: true,
            have: ["@"],
            minLen: 5,
            maxLen: 32,
          },
          value: "",
          valid: false,
          touched: false,
        },
        street: {
          elementtype: "input",
          config: {
            type: "text",
            placeholder: "Your Street",
          },
          rules: {
            required: true,
            minLen: 5,
            maxLen: 50,
          },
          value: "",
          valid: false,
          touched: false,
        },
        zipCode: {
          elementtype: "input",
          config: {
            type: "text",
            placeholder: "ZIPCODE",
          },
          rules: {
            required: true,
            minLen: 6,
            maxLen: 6,
          },
          value: "",
          valid: false,
          touched: false,
        },
        delieveryMethod: {
          elementtype: "select",
          config: {
            options: [
              { value: "hPriority", displayname: "High" },
              { value: "nPriority", displayname: "Normal" },
              { value: "lPriority", displayname: "Low" },
            ],
          },
          value: "hPriority", //IF USER DIDN'T SCROLL SELECT OPTION
        },
      },
      canOrder: false,
      addresses: null,
      selectedAddressIndex: -1,
      showAddress: false,
      confirmOrder: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/shop/contactdata", {
        headers: {
          token: "Bearer " + this.props.token,
          userId: this.props.userId,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const addresses = response.data.addresses;
        let saved_addresses = [];
        if (addresses.length) {
          saved_addresses = [];
          for (let address of addresses) {
            saved_addresses.push({
              name: address.name,
              email: address.email,
              street: address.street,
              zipCode: address.zipCode,
              id: address.id,
            });
          }
        }
        this.props.init();
        console.log(saved_addresses);
        this.setState({ addresses: saved_addresses, showAddress: true });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    if (this.props.order_status) {
      this.props.history.push("/");
    }
  }

  orderSubmissionHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ confirmOrder: true });
  };

  orderHandler = (type) => {
    this.setState({ confirmOrder: false });
    let shouldOrder = true;
    for (let key in this.state.orderForm) {
      if (
        this.state.orderForm[key].elementtype === "input" &&
        this.state.orderForm[key].valid === false
      ) {
        shouldOrder = false;
        break;
      }
    }
    if (!shouldOrder) {
      return alert("Inavalid Data");
    }
    let customerInfo = {};
    for (let key in this.state.orderForm) {
      customerInfo[key] = this.state.orderForm[key].value;
    }
    let id = null;
    if (this.state.addresses.length) {
      if (this.state.selectedAddressIndex !== -1) {
        id = this.state.addresses[this.state.selectedAddressIndex].id;
      }
    }
    this.props.orderPlaced(
      this.props.ingredients,
      customerInfo,
      this.props.token,
      this.props.userId,
      type,
      id
    );
  };

  updateFormStatus(key, value) {
    let isValid = checkValidity(value, this.state.orderForm[key].rules);
    let canOrder = isValid;
    for (let ele in this.state.orderForm) {
      if (this.state.orderForm[ele].elementtype === "input" && ele !== key) {
        canOrder = canOrder && this.state.orderForm[ele].valid;
      }
    }
    this.setState({ canOrder: canOrder });
    this.setState((prevState) => {
      return {
        orderForm: {
          ...prevState.orderForm,
          [key]: { ...prevState.orderForm[key], valid: isValid, touched: true },
        },
      };
    });
  }

  inputChangeHandler = (event, key) => {
    let ordeformclone = _.cloneDeep(this.state.orderForm);
    ordeformclone[key].value = event.target.value;
    this.setState({ orderForm: ordeformclone });
    if (this.state.orderForm[key].elementtype !== "select") {
      this.updateFormStatus(key, event.target.value);
    }
  };

  fillForm = (index) => {
    if (index === -1) {
      return this.setState({ showAddress: false });
    }
    const updatedOrderForm = { ...this.state.orderForm };
    const selectedAddress = {};
    for (let key in this.state.orderForm) {
      if (this.state.orderForm[key].elementtype === "input") {
        selectedAddress[key] = this.state.addresses[index][key];
      }
    }
    for (let key in selectedAddress) {
      updatedOrderForm[key].value = selectedAddress[key];
      updatedOrderForm[key].valid = true;
      updatedOrderForm[key].touched = true;
    }
    this.setState({
      orderForm: updatedOrderForm,
      canOrder: true,
      selectedAddressIndex: index,
      showAddress: false,
    });
  };

  render() {
    if (this.state.confirmOrder) {
      if (this.state.selectedAddressIndex !== -1) {
        let changed = false;
        for (let key in this.state.addresses[this.state.selectedAddressIndex]) {
          if (
            this.state.addresses[this.state.selectedAddressIndex][key] !==
            this.state.orderForm[key].value
          ) {
            changed = true;
            break;
          }
        }
        if (changed) {
          return (
            <Modal show>
              <p>
                We Observed that you picked up an old adrress and modified for
                this order
              </p>
              <Button type="Success" click={() => this.orderHandler("ADD")}>
                ADD ADDRESS
              </Button>
              <Button type="Success" click={() => this.orderHandler("REPLACE")}>
                REPLACE ADDRESS
              </Button>
              <Button
                type="Danger"
                click={() => this.orderHandler("DO NOTHING")}
              >
                DO NOTHING
              </Button>
            </Modal>
          );
        } else {
          this.orderHandler("DO NOTHING");
        }
      } else {
        return (
          <Modal show>
            Want to save this address for future orders?
            <Button type="Success" click={() => this.orderHandler("ADD")}>
              YES
            </Button>
            <Button type="Danger" click={() => this.orderHandler("DO NOTHING")}>
              NO
            </Button>
          </Modal>
        );
      }
    }
    if (this.state.addresses && this.state.showAddress) {
      if (this.state.addresses.length) {
        const addresses = this.state.addresses.map((address, index) => (
          <div
            onClick={() => this.fillForm(index)}
            key={index}
            className={styles.Address}
          >
            <p>
              <strong>Name: </strong>
              {address.name}
            </p>
            <p>
              <strong>Email: </strong>
              {address.email}
            </p>
            <p>
              <strong>Street: </strong>
              {address.street}
            </p>
            <p>
              <strong>ZipCode: </strong>
              {address.zipCode}
            </p>
          </div>
        ));
        return (
          <Modal show>
            {addresses}
            <p
              className={styles.Address}
              style={{ marginBottom: "0px" }}
              onClick={() => this.fillForm(-1)}
            >
              {" "}
              <strong>+ Add Custom Address</strong>
            </p>
          </Modal>
        );
      } else {
        return (
          <Modal show modalclosed={() => this.setState({ showAddress: false })}>
            No Previous Addresses were Fetched!
          </Modal>
        );
      }
    }
    const formsele = [];
    for (let key in this.state.orderForm) {
      formsele.push(
        <Input
          key={key}
          {...this.state.orderForm[key]}
          change={(event) => this.inputChangeHandler(event, key)}
        />
      );
    }
    const form = (
      <div className={styles.ContactData}>
        <h4>User Information</h4>
        <form>
          {formsele}
          <Button
            type="Success"
            click={this.orderSubmissionHandler}
            disabled={!this.state.canOrder}
          >
            ORDER
          </Button>
        </form>
      </div>
    );
    const element = this.props.loading ? <Spinner /> : form;
    return element;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    order_status: state.orders.order_status,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (ingredients, info, token, userId, type, addressId) => {
      dispatch(
        actions.orderPlaced(ingredients, info, token, userId, type, addressId)
      );
    },
    init: () => dispatch(actions.initContactData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorHandler(ContactData, axios, "show")));
