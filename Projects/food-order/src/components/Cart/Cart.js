import { useStore, actions } from "../../store";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [cart, dispatch] = useStore();

  const addCartItemHanler = (item) => {
    dispatch(
      actions.addItem({
        ...item,
        amount: 1,
      })
    );
  };
  const removeCartItemHandler = (id) => {
    dispatch(actions.removeItem(id));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHanler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cart.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Close
        </button>
        {cart.items.length > 0 && (
          <button className={classes["button"]}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
