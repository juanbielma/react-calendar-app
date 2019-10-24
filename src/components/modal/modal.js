import React from "react";
import classnames from "classnames";

import "./modal.scss";

const Modal = (props) => {
    if (!props.show) return null;
    return (
      <div className={classnames("modal")}>
        <div className="overlay" />
        <div className="modal-content">{props.children}</div>
      </div>
    );
}

  function ModalHeader({ children }) {
    return <div className="modal-header">{children}</div>;
  }
  
  function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
  }
  
  Modal.Body = ModalBody;
  Modal.Header = ModalHeader;
  
  export default Modal;