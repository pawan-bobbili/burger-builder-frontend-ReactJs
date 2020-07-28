import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";

class Logout extends React.Component {
  cancelHandler = () => {
    this.props.history.goBack();
  };

  confirmHandler = () => {
    this.props.onLogout();
    this.props.history.push("/");
  };

  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.push("/authenticate?dest=/logout", {
        message: "Need Authentication !!",
      });
    }
  }

  render() {
    return (
      <Auxilary>
        <Modal show modalclosed={this.cancelHandler}>
          <p>Are you sure want to LOGOUT ?</p>
          <Button type="Success" click={this.confirmHandler}>
            YES
          </Button>
          <Button type="Danger" click={this.cancelHandler}>
            NO
          </Button>
        </Modal>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.auth_logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
