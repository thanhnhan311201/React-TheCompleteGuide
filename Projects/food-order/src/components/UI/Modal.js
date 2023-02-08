import ReactDOM from "react-dom";

import Card from "./Card";
import Cart from "./../Cart/Cart";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop onHideCart={props.onHideCart} />
          <ModalOverlay>{props.children}</ModalOverlay>
        </>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
