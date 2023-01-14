import "./ExpensesFilter.css";

const yearsFilter = [2022, 2021, 2020, 2019];

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (e) => {
    props.onChangeFilter(Number(e.target.value));
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {yearsFilter.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
