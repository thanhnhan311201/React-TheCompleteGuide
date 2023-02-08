import { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      Number(enteredAmount) < 1 ||
      Number(enteredAmount) > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(Number(enteredAmount));
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: `amount_${props.id}`,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
