import { useRef, useState, useContext } from "react";

import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const [todo, setTodo] = useState<string>("");

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    setTodo("");
    todoTextInputRef.current!.focus();
    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input
        type="text"
        id="text"
        ref={todoTextInputRef}
        value={todo}
        onChange={(event) => setTodo(event.target?.value)}
      />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
