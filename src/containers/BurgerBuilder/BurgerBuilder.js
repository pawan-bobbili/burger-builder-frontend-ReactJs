import React from "react";
import { connect } from "react-redux";

import Auxilary from "../../hoc/Auxilary/Auxilary";
import * as actions from "../../store/actions";
import axios from "axios";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordered: false,
    };
  }

  componentDidMount() {
    if (!this.props.ingredients) {
      this.props.init();
    }
  }

  purchaseHandler = () => {
    this.setState({ ordered: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ ordered: false });
  };

  orderHandler = () => {
    if (this.props.authenticated) {
      this.props.history.push("/checkout");
    } else {
      this.props.history.push({
        pathname: "/authenticate",
        search: "?dest=/checkout",
        state: { message: "Need Authentication" },
      });
    }
  };

  render() {
    let insideModal = null;
    if (this.state.ordered) {
      insideModal = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalprice={+this.props.totalprice.toFixed(2)}
          show={this.state.ordered}
          cancel={this.purchaseCancelHandler}
          continue={this.orderHandler}
        />
      );
    }

    let buildControls = <Spinner />;
    if (this.props.ingredients) {
      buildControls = (
        <BuildControls
          ingredients={this.props.ingredients}
          dec={this.props.rem_ing}
          inc={this.props.add_ing}
          price={+this.props.totalprice.toFixed(2)}
          purchase={this.purchaseHandler}
        />
      );
    }
    return (
      <Auxilary>
        <Modal
          show={this.state.ordered}
          modalclosed={this.purchaseCancelHandler}
        >
          {insideModal}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        {buildControls}
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalprice: state.burgerBuilder.totalprice,
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_ing: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    rem_ing: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    init: () => dispatch(actions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios, "retry"));
