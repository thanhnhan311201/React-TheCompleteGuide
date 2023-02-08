import { useReducer } from "react";

import CartContext from "./cart-context";
import cartReducer, { cartInitState } from "./cart-reducer";
import logger from "./logger";

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(logger(cartReducer), cartInitState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
