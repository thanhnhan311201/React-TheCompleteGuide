import { useState, useEffect } from "react";

import CartIcon from "../Cart/CartIcon";
import { useStore } from "../../store";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [cart, dispatch] = useStore();

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart.items]);

  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${btnIsHighlighted ? classes.bump : ""}`}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cart.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
