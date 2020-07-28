import React from "react";

import Auxilary from "../Auxilary/Auxilary";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";

const ErrorHandler = (WrappedComponent, axios, mode) => {
  return class Covered extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Error: null,
        pageFailed: false,
      };

      this.requestInc = axios.interceptors.request.use((reqConfig) => {
        //this.setState({ pageFailed: false });                                            Using this statement will make Wrapped Component to update without any prop changes. so,if ComponentDidUpdate is used to send async request, then that wrapped component should be PureComponent, Otherwise Infinite Loop will be created.
        return reqConfig;
      }, this.errorHandler);

      this.responseInc = axios.interceptors.response.use((resConfig) => {
        this.setState({ pageFailed: false, Error: null });
        return resConfig;
      }, this.errorHandler);
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInc);
      axios.interceptors.response.eject(this.responseInc);
    }

    errorHandler = (err) => {
      if (err.response) {
        const errors = [];
        let keys = 0;
        for (let error of err.response.data.message) {
          errors.push(
            <p key={keys}>
              <strong>{error}</strong>
            </p>
          );
          keys++;
        }
        this.setState({ Error: errors, pageFailed: true });
      } else {
        this.setState({ Error: err.message, pageFailed: true });
      }
      return Promise.reject(err);
    };

    ErrorBackdropHandler = () => {
      if (mode === "retry") {
        this.setState({ Error: null });
      } else {
        this.setState({ Error: null, pageFailed: false });
      }
    };

    render() {
      let childComponent = <WrappedComponent {...this.props} />;
      if (this.state.pageFailed && mode === "retry") {
        childComponent = (
          <Button
            type="Success"
            click={() => this.setState({ pageFailed: false })}
          >
            RETRY
          </Button>
        );
      }
      return (
        <Auxilary>
          <Modal
            show={this.state.Error}
            modalclosed={this.ErrorBackdropHandler}
          >
            {this.state.Error}
          </Modal>
          {childComponent}
        </Auxilary>
      );
    }
  };
};

export default ErrorHandler;
