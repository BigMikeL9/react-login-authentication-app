import React, { useState, useEffect, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/contexts/authContext";

function App() {
  // -- 🔵 Moved to 'authContext.js' [to have authentication in one place] --
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // -------------------------------------
  /* - This will cause an INFINITE loop, because 'localStorage_LogInStatus' is equal to '1' after we stored it in local storage.
     - And so the component will infinitely re-render through the 'setIsLoggedIn(true);'
     - This is a 'Side Effect' which should be handled by the 'useEffect' hook, inorder for it to only run once when the app starts-up.
  */

  // const localStorage_LogInStatus = +localStorage.getItem("isLoggedIn");

  // if (localStorage_LogInStatus === 1) {
  //   console.log("LOGGED IN 💃💃");
  //   setIsLoggedIn(true);
  // }

  // -------------------------------------
  /* 🟠 - Using the 'useEffect' Hook here to access data stored in the browser storage. 
        - So that when page refreshes the user is still logged in.
        - The 'useEffect' Hook first argument function, will only run *ONCE* when the app starts-up for the first time, ⭐ since there are NO dependencies specified in the second argument of the hook. ⭐
        - The 'useEffect' hook itself runs with every Render, but the first argument function executes ONLY if the specified dependencies change. Since no dependencies are specified, the first argument function will NOT be executed with every re-render after the app starts.  
        👇👇👇
*/

  // -- 🔵 Moved to 'authContext.js' [to have authentication in one place] --
  // useEffect(() => {
  //   const localStorage_LogInStatus = +localStorage.getItem("isLoggedIn");

  //   if (localStorage_LogInStatus === 1) {
  //     console.log("LOGGED IN 💃💃");
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  // -------------------------------------

  // -- 🔵 Moved to 'authContext.js' [to have authentication in one place] --
  // const loginHandler = (email, password) => {
  //   // - Browser has multiple storages we can use. Most common for this case, is cookies storage or Local storage.
  //   // - We'll use local storage because it is easy to work with (built-into the browser). Can access local storage in browser through the 'application' tab
  //   // - Storing 'isLoggedIn' state value in local storage using -> 'localStorage' GLOBAL object, available in the browser.
  //   localStorage.setItem("isLoggedIn", "1"); //    --> value of '1' means LOGGED IN 🟢.

  //   setIsLoggedIn(true);
  // };

  // -- 🔵 Moved to 'authContext.js' [to have authentication in one place] --
  // const logoutHandler = () => {
  //   localStorage.setItem("isLoggedIn", "0"); //    --> value of '0' means NOT LOGGED IN 🔴.

  //   setIsLoggedIn(false);
  // };

  // -- 🟠 using 'useContext'
  const authContextData = useContext(AuthContext);
  console.log(authContextData);

  return (
    <>
      <MainHeader />
      <main>
        {!authContextData.isLoggedIn && <Login />}
        {authContextData.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
