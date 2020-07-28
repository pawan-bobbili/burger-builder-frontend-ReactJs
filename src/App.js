import loadable from "@loadable/component";
import React from "react";
import { Route } from "react-router-dom";

import Authenticate from "./containers/Auth/auth";
import * as actions from "./store/actions";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { connect } from "react-redux";
import Layout from "./containers/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";

const Addresses = loadable(() => import("./containers/Addresses/Addresses"));
const Checkout = loadable(() => import("./containers/Checkout/Checkout"));
const Orders = loadable(() => import("./containers/Orders/Orders"));

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = localStorage.getItem("expirationDate");
      if (new Date() > new Date(expirationDate)) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiartionDate");
      } else {
        this.props.setAuth(token, localStorage.getItem("userId"));
      }
    }
  }
  componentDidUpdate() {
    //console.log("App Updated");
  }
  render() {
    return (
      <Layout>
        <Route
          path="/"
          exact
          render={(props) => <BurgerBuilder {...props} />}
        />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/authenticate" component={Authenticate} />
        <Route path="/addresses" component={Addresses} />
      </Layout>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    setAuth: (idToken, localId) =>
      dispatch(actions.loginSuccess(idToken, localId)),
  };
};

export default connect(null, mapDispatchtoProps)(App);
