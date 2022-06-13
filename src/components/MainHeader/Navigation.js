import React, { useContext } from "react";
import AuthContext from "../contexts/authContext";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const authContextData = useContext(AuthContext);
  // console.log(authContextData);

  return (
    <nav className={classes.nav}>
      <ul>
        {authContextData.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authContextData.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authContextData.isLoggedIn && (
          <li>
            <button onClick={authContextData.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
