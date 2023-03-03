import { ADD_ITEM } from "./constants";
import { REMOVE_ITEM } from "./constants";
import { CLEAR_CART } from "./constants";

export const addItem = (payload) => ({ type: ADD_ITEM, payload });

export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });

export const clearCart = () => ({ type: CLEAR_CART });
