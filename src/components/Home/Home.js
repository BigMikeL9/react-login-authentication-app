import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../contexts/authContext";

import classes from "./Home.module.css";

const Home = (props) => {
  // -- 🔵 using 'useContext'
  const authContextData = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authContextData.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
