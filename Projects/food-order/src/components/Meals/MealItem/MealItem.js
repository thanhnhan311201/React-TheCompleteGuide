import { useStore, actions } from "../../../store";
import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const [items, setItems] = useStore();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    setItems(
      actions.addItem({
        id: props.id,
        name: props.name,
        amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
