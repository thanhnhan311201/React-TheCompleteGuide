import { useState } from "react";

import "./ExpenseForm.css";

function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(Number(e.target.value));
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setShowForm(!showForm);
  };

  const cancelHandler = () => {
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setShowForm(!showForm);
  };

  return (
    <form onSubmit={submitHandler}>
      {showForm && (
        <div>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Amount</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={enteredAmount}
                onChange={amountChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input
                type="date"
                min="2019-01-01"
                max="2022-12-31"
                value={enteredDate}
                onChange={dateChangeHandler}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div className="new-expense__actions">
              <button type="button" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
            <div className="new-expense__actions">
              <button type="submit">Add Expense</button>
            </div>
          </div>
        </div>
      )}

      {showForm || (
        <div className="new-expense__actions" style={{ textAlign: "center" }}>
          <button onClick={() => setShowForm(!showForm)} type="submit">
            Add New Expense
          </button>
        </div>
      )}
    </form>
  );
}

export default ExpenseForm;
