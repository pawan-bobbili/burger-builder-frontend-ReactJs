import React from "react";

import { connect } from "react-redux";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SideDrawer: false,
    };
  }
  componentDidMount() {
    //console.log("Layout m");
  }
  componentDidUpdate() {
    //console.log("Layout u");
  }
  SideDrawerHandler = () => {
    this.setState((prevstate) => {
      return { SideDrawer: !prevstate.SideDrawer };
    });
  };

  render() {
    return (
      <Auxilary>
        <Toolbar click={this.SideDrawerHandler} isAuth={this.props.isAuth} />
        <SideDrawer
          show={this.state.SideDrawer}
          click={this.SideDrawerHandler}
          isAuth={this.props.isAuth}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, null)(Layout);
