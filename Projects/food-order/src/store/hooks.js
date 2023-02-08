import { useContext } from "react";

import CartContext from "./cart-context";

export const useStore = () => {
  const [state, dispatch] = useContext(CartContext);

  return [state, dispatch];
};
