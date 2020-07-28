import axios from "axios";
import React from "react";

import * as actions from "../../store/actions";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { checkValidity } from "../../shared/utitlity";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          elementtype: "input",
          config: {
            type: "email",
            placeholder: "Email Address",
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
        password: {
          elementtype: "input",
          config: {
            type: "password",
            placeholder: "Password",
          },
          rules: {
            required: true,
            minLen: 6,
          },
          value: "",
          valid: false,
          touched: false,
        },
      },
      dest: "/",
      modalContent: null,
      canSubmit: false,
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let dest = "/";
    let modalContent = null;
    for (let param of query.entries()) {
      if (param[0] === "dest") {
        dest = param[1];
      }
    }

    if (this.props.location.state) {
      modalContent = this.props.location.state.message;
    }
    this.setState({ dest: dest, modalContent: modalContent });
  }

  componentDidUpdate() {
    if (this.props.authenticated && !this.props.loading) {
      this.props.history.replace(this.state.dest);
    }
  }

  updateFormStatus(key, value) {
    let isValid = checkValidity(value, this.state.controls[key].rules);
    let canSubmit = isValid;
    for (let ele in this.state.controls) {
      if (this.state.controls[ele].elementtype === "input" && ele !== key) {
        canSubmit = canSubmit && this.state.controls[ele].valid;
      }
    }
    this.setState({ canSubmit: canSubmit });
    this.setState((prevState) => {
      return {
        controls: {
          ...prevState.controls,
          [key]: { ...prevState.controls[key], valid: isValid, touched: true },
        },
      };
    });
  }

  inputChangeHandler = (event, key) => {
    const updatedForm = { ...this.state.controls };
    updatedForm[key].value = event.target.value;
    this.setState({ controls: updatedForm });
    this.updateFormStatus(key, event.target.value);
  };

  formSubmission = (event) => {
    event.preventDefault();
    if (!this.props.signin) {
      this.props.signupSubmit(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    } else {
      this.props.signinSubmit(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    }
    // The User is required  to type the password again if the request fails.. & will make Signin/Signup button disable while Sending request
    this.setState((prevState) => {
      return {
        controls: {
          ...prevState.controls,
          password: {
            ...prevState.controls.password,
            value: "",
            valid: false,
            touched: false,
          },
        },
        canSubmit: false,
      };
    });
  };

  messageModalCanceller = () => {
    this.setState({ modalContent: null });
  };

  render() {
    const formEle = [];
    for (let key in this.state.controls) {
      formEle.push(
        <Input
          key={key}
          {...this.state.controls[key]}
          change={(event) => this.inputChangeHandler(event, key)}
        />
      );
    }
    let modal = null;
    if (this.state.modalContent) {
      modal = (
        <Modal show modalclosed={this.messageModalCanceller}>
          {this.state.modalContent}
        </Modal>
      );
    }
    return (
      <Auxilary>
        {modal}
        <div className={styles.Auth}>
          <form>
            {this.props.loading ? <Spinner /> : formEle}
            <button
              onClick={(event) => {
                event.preventDefault();
                this.props.toggleAuth();
              }}
              style={{ color: "blue", borderBottom: "2px block blue" }}
            >
              {this.props.signin
                ? "Create a new Account"
                : "Already Have Account"}
            </button>
            <Button
              type="Success"
              click={this.formSubmission}
              disabled={!this.state.canSubmit}
            >
              {this.props.signin ? "SIGNIN" : "SIGNUP"}
            </Button>
          </form>
        </div>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.authenticated,
    signin: state.auth.signin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupSubmit: (email, password) =>
      dispatch(actions.signup(email, password)),
    signinSubmit: (email, password) =>
      dispatch(actions.signin(email, password)),
    toggleAuth: () => dispatch(actions.toggleAuth()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorHandler(Auth, axios, "show")));
