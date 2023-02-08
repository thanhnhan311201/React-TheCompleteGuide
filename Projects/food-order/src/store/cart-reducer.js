import { ADD_ITEM } from "./constants";
import { REMOVE_ITEM } from "./constants";

const cartInitState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (state.items.map((item) => item.id).includes(action.payload.id)) {
        return {
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                amount: item.amount + action.payload.amount,
              };
            } else {
              return item;
            }
          }),
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.amount,
        };
      }

      return {
        items: [...state.items, action.payload],
        totalAmount:
          state.totalAmount + action.payload.price * action.payload.amount,
      };
    case REMOVE_ITEM:
      const removedItem = state.items.filter(
        (item) => item.id === action.payload
      )[0];

      if (removedItem.amount > 1) {
        return {
          items: state.items.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                amount: item.amount - 1,
              };
            } else {
              return item;
            }
          }),
          totalAmount: state.totalAmount - removedItem.price,
        };
      }

      return {
        items: state.items.filter((item) => item.id !== action.payload),
        totalAmount: state.totalAmount - removedItem.price * removedItem.amount,
      };
    default:
      throw new Error("Invalid action.");
  }
};

export { cartInitState };
export default cartReducer;
