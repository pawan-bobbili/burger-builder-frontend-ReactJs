import axios from "axios";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Button from "../../components/UI/Button/Button";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Order from "../../components/Orders/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

class Orders extends React.Component {
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.push("/authenticate?dest=/orders", {
        message: "Need Authentication !!",
      });
    } else {
      const query = new URLSearchParams(this.props.location.search);
      let page = 1;
      for (let param of query.entries()) {
        if (param[0] === "page") {
          page = +param[1];
        }
      }
      this.props.setPage(page);
    }
  }

  componentDidUpdate() {
    if (!this.props.orders) {
      this.props.fetchOrders(
        this.props.token,
        this.props.userId,
        this.props.page
      );
    }
  }

  render() {
    if (this.props.pageFailed) {
      return <p>Sorry!! Try Again Later</p>;
    } else if (!this.props.orders) {
      return <Spinner />;
    }
    const orders = [];
    for (let order of this.props.orders) {
      console.log(order);
      orders.push(
        <Order
          key={order.key}
          ingredients={order.ingredients}
          info={order.customerInfo}
          price={order.price.toFixed(2)}
        />
      );
    }
    return (
      <Auxilary>
        {orders}
        <Button
          type="Success"
          click={() => this.props.setPage(this.props.page + 1)}
          disabled={
            this.props.page * this.props.perPage >= this.props.totalOrders
          }
        >
          Next
        </Button>
        <Button
          type="Danger"
          click={() => this.props.setPage(this.props.page - 1)}
          disabled={this.props.page === 1}
        >
          Back
        </Button>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    token: state.auth.token,
    authenticated: state.auth.authenticated,
    userId: state.auth.userId,
    page: state.orders.ordersPage,
    perPage: state.orders.perPage,
    totalOrders: state.orders.totalOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId, page) =>
      dispatch(actions.fetchOrders(token, userId, page)),
    setPage: (page) => dispatch(actions.setPage(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorHandler(Orders, axios, "retry")));
