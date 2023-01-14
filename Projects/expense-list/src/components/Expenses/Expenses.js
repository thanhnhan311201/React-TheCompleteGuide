import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";
import { useState } from "react";

function Expenses(props) {
  const [selectedYear, setSelectedYear] = useState(2022);

  const filterChangeHandler = (selectedYear) => setSelectedYear(selectedYear);

  const filteredExpenses = props.items.filter(
    (item) => item.date.getFullYear() === selectedYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
