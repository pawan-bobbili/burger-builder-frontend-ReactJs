import axios from "axios";
import React from "react";
import { connect } from "react-redux";

import Auxilary from "../../hoc/Auxilary/Auxilary";
import Address from "../../components/Address/Address";
import Button from "../../components/UI/Button/Button";
import { checkValidity } from "../../shared/utitlity";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

class Addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
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
      },
      canSubmit: false,
      addresses: null,
      edit: false,
      selectedId: "",
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
        //console.log(addresses);
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
        this.setState({ addresses: saved_addresses });
      })
      .catch((err) => console.log(err));
  }

  inputChangeHandler = (event, key) => {
    let value = event.target.value;
    let isValid = checkValidity(
      event.target.value,
      this.state.controls[key].rules
    );
    let canSubmit = isValid;
    for (let item in this.state.controls) {
      if (item !== key) {
        canSubmit = canSubmit && this.state.controls[item].valid;
      }
    }
    this.setState((prevState) => {
      return {
        canSubmit: canSubmit,
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value, // using event.target.value will not work here..?
            touched: true,
            valid: isValid,
          },
        },
      };
    });
  };

  editAddressHandler = (event) => {
    event.preventDefault();
    const data = {};
    for (let key in this.state.controls) {
      data[key] = this.state.controls[key].value;
    }
    axios
      .post(
        "http://localhost:8080/shop/editAddress",
        JSON.stringify({
          newAddress: data,
          id: this.state.selectedId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            token: "Bearer " + this.props.token,
            userId: this.props.userId,
          },
        }
      )
      .then((result) => {
        const saved_addresses = [];
        for (let address of this.state.addresses) {
          if (address.id === this.state.selectedId) {
            for (let key in this.state.controls) {
              address[key] = this.state.controls[key].value;
            }
          }
          saved_addresses.push(address);
        }
        this.setState({
          edit: false,
          selectedId: "",
          addresses: saved_addresses,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteAddressHandler = (index) => {
    axios.delete(`http://localhost:8080/shop/deleteAddress/${index}`, {
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + this.props.token,
        userId: this.props.userId,
      },
    });
  };

  fillForm = (id) => {
    console.log(id);
    let selectedAddress;
    for (let address of this.state.addresses) {
      if (address.id === id) {
        selectedAddress = { ...address };
        break;
      }
    }
    const updatedControls = { ...this.state.controls };
    for (let key in selectedAddress) {
      if (key !== "id") {
        updatedControls[key].value = selectedAddress[key];
        updatedControls[key].touched = true;
        updatedControls[key].valid = true;
      }
    }
    this.setState((prevState) => {
      return {
        controls: updatedControls,
        canSubmit: true,
        edit: true,
        selectedId: id,
      };
    });
  };

  render() {
    let modal = null;
    if (this.state.edit) {
      const formsele = [];
      for (let key in this.state.controls) {
        formsele.push(
          <Input
            key={key}
            {...this.state.controls[key]}
            change={(event) => this.inputChangeHandler(event, key)}
          />
        );
      }
      modal = (
        <Modal
          show
          modalclosed={() => this.setState({ edit: false, selectedId: "" })}
        >
          <div>
            <h4>Edit Address</h4>
            <form>
              {formsele}
              <Button
                type="Success"
                click={(event) => this.editAddressHandler(event)}
                disabled={!this.state.canSubmit}
              >
                MAKE CHANGE
              </Button>
            </form>
          </div>
        </Modal>
      );
    }
    //console.log(this.state.addresses);
    if (!this.state.addresses) {
      return <Spinner />;
    }

    if (!this.state.addresses.length) {
      return (
        <div>
          <p>NO addresses were found</p>
        </div>
      );
    }

    const addresses = this.state.addresses.map((address) => {
      return (
        <Address
          edit={this.fillForm.bind(this, address.id)}
          delete={() => this.deleteAddressHandler(address.id)}
          address={address}
          keys={address.id}
          key={address.id}
        />
      );
    });
    return (
      <Auxilary>
        {modal}
        {addresses}
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(
  ErrorHandler(Addresses, axios, "retry")
);
