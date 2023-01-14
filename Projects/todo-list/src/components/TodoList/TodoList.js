import { useStore, actions } from "../../store";
import { useRef } from "react";

import classes from "./TodoList.module.css";

const TodoList = (props) => {
  const [state, dispatch] = useStore();

  const inputRef = useRef();

  const addHandler = () => {
    dispatch(actions.addTodo(state.todoInput));
    dispatch(actions.setTodoInput(""));

    inputRef.current.focus();
  };

  return (
    <div>
      <input
        value={state.todoInput}
        ref={inputRef}
        placeholder="Enter todo..."
        onChange={(e) => dispatch(actions.setTodoInput(e.target.value))}
      />
      <button onClick={addHandler}>Add</button>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
