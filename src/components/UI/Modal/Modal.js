import React from "react";

import Auxilary from "../../../hoc/Auxilary/Auxilary";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  React.useEffect(() => {
    //console.log("Modal", props.show);
  });
  return (
    <Auxilary>
      <Backdrop show={props.show} click={props.modalclosed} />
      <div
        className={styles.Modal}
        style={{
          opacity: props.show ? 1 : 0,
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {props.children}
      </div>
    </Auxilary>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
