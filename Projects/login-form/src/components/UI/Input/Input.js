import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = (props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return { focus: () => inputRef.current.focus() };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        ref={inputRef}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </div>
  );
};

export default React.forwardRef(Input);
