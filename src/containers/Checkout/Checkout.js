import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  // constructor(props) {
  //   super(props);
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ing = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] !== "price") ing[param[0]] = +param[1];
  //     // without '+', param[1] will be string hence , wrong burger will be dispalyed
  //     else price = +param[1];
  //   }
  //   this.state = {
  //     ingredients: ing,
  //     price: price,
  //   };
  // }

  componentDidMount() {
    this.props.init();
  }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  confirmOrderHandler = () => {
    this.props.history.replace(this.props.match.url + "/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancel={this.cancelOrderHandler}
          proceed={this.confirmOrderHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    init: () => dispatch(actions.initCheckout()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout);
