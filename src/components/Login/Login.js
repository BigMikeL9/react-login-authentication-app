import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../contexts/authContext";
import Input from "../Input/Input";

// ---------------------------
// 🔵 -- using 'useReducer' Hook --
const reducerEmail = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  if (action.type === "EMAIL_BLUR") {
    // using LATEST state
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

// ---
const initialEmailState = { value: "", isValid: null };

// ----------
const reducerPassword = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.value, isValid: action.value.length > 6 };
  }

  if (action.type === "PASSWORD_BLUR") {
    // using LATEST state
    return { value: state.value, isValid: state.value.length > 6 };
  }

  return { value: "", isValid: null };
};

// ---
const initialPasswordState = { value: "", isValid: null };

// ------------------------------------------------------
const Login = () => {
  // ---------------------------
  // 🟠 -- using 'useState' --
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // ---------------------------
  // 🔵 -- using 'useReducer' Hook --
  const [email, dispatchEmail] = useReducer(reducerEmail, initialEmailState);
  const [password, dispatchPassword] = useReducer(
    reducerPassword,
    initialPasswordState
  );

  // ---------------------------
  /* 🟠 using 'useEffect' hook 
        - Another usecase of 'useEffect' hook is that it helps us avoid duplicate code by having that code in one place (in the 'useEffect' hook FIRST argument), 
          and then executing that code, whenever certain variables/dependencies change, usually a state or prop (specified in the 'useEffect' hook SECOND argument). 
        - SIDE NOTE: we can consider the case below as a side effect, and thus use 'useEffect' to execute code in response to a 'state' being changed.

        - Debouncing using the cleanup mechanism in 'useEffect' functions.
*/

  // ⭐⭐ IMPORTANT - Common pattern  -> Object Destructuring with newly assigned variable names 👇
  // -- Pulling out properties from an Object and storing them in new variables using Object destructuring.
  // -- Then we use these new variables to trigger 'useEffect' whenever they change
  // -- We do so, so that 'useEffect' does NOT get triggered whenever ANY of the properties in the Object changes. Instead ONLY when the properties we need in the OBJECT changes (properties that we stored in new variables using Object Destructuring) (Good for performance)
  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {
    const runLater = setTimeout(() => {
      console.log("Debouncing -- Checking Form Validity!!!");

      setFormIsValid(emailIsValid && passwordIsValid);

      console.log(emailIsValid, passwordIsValid);
    }, 500);

    // -- 'Cleanup' function inside 'Side Effect' function 👇
    return () => {
      console.log("CLEANUP");
      // -- cancels the timeout of previously executed side Effect function (ie: the 'runLater' function) as long as use types
      clearTimeout(runLater);
    };
  }, [emailIsValid, passwordIsValid]);

  // ---------------------------

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "EMAIL_INPUT",
      value: event.target.value,
    });

    // 🟠 -- using 'useState' --
    // setEnteredEmail(event.target.value);

    // setFormIsValid(email.isValid && password.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", value: event.target.value });

    // 🟠 -- using 'useState' --
    // setEnteredPassword(event.target.value);

    // setFormIsValid(email.isValid && password.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });

    // 🟠 -- using 'useState' --
    // setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" });

    // 🟠 -- using 'useState' --
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // ---------------------------
  // -- 🟡 'Forwarding refs' ->  Creating References to component function elements
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // ---------------------------
  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      // -- 🔵 using 'useContext'
      authContextData.onLogin(email.value, password.value);

      // 🟠 -- using 'useState' --
      // props.onLogin(enteredEmail, enteredPassword);
    } else if (!emailIsValid) {
      // -- 🟡 'Forwarding refs' ->  focus email input if invalid
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  // -- 🔵 using 'useContext'
  const authContextData = useContext(AuthContext);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          value={email.value}
          id="email"
          label="E-mail"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          value={password.value}
          id="password"
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        {/* <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
