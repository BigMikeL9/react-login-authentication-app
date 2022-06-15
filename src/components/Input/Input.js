import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

// 'ref' attribute contains the data passed in to the 'useImperativeHandle()' second argument, which can be used by the component child elements, through 'ref'
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  console.log(inputRef);
  console.log(ref);

  const focus = () => {
    inputRef.current.focus();
  };

  // Calling this function from Parent to do something to child (uncommon, but could be useful in reusable component libraries)
  useImperativeHandle(ref, () => {
    return { focus: focus };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </div>
  );
});

export default Input;
