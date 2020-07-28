import React from "react";
import { withRouter } from "react-router-dom";

import CompanyLogo from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = (props) => (
  <div className={styles.Logo} onClick={() => props.history.replace("/")}>
    <img src={CompanyLogo} alt="Company Logo" />
  </div>
);

export default withRouter(Logo);
