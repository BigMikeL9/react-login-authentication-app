import React, { useState, useEffect } from "react";

// -----
// --- Good practice to make the 'createContext' defaultValue similar to what is passed in the 'value={ ... }' prop in the Provider.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

// -----
// -- Building & Using a Custom Context Provider Component
// Putting user Authentication state in one place, and then using it in other Components
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599262#questions

export const AuthContextProvider = (props) => {
  //   console.log(props);

  // -- 📝 Extracted from 'App.js' -- See comments there for explanation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStorage_LogInStatus = +localStorage.getItem("isLoggedIn");

    if (localStorage_LogInStatus === 1) {
      console.log("LOGGED IN 💃💃");
      setIsLoggedIn(true);
    }
  }, []);

  // -------------------------------------
  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");

    setIsLoggedIn(false);
  };

  // -------------------------------------
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
