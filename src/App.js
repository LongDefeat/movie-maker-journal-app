import React, { useEffect, useState } from "react";
import "./App.css";
import RoutesFunc from "./routes-nav/Routes";
import MovieDatabaseApi from "./api/MovieDatabaseApi";
import UserDatabaseApi from "./api/UserDatabaseApi";
import UserContext from "./auth/UserContext";
import { decodeToken } from "react-jwt";
import Navigation from "./routes-nav/Navigation";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "mmj-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            // let { username } = jwt.decode(token);
            let { username } = decodeToken(token);
            MovieDatabaseApi.token = token;
            let currentUser = await UserDatabaseApi.getCurrentUser(username);
            console.log(currentUser);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  // Handles site-wide logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /**Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   */
  async function signup(signupData) {
    try {
      let token = await UserDatabaseApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("signup failed", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide login
  async function login(loginData) {
    try {
      let token = await UserDatabaseApi.login(loginData);
      console.log("app.js login function token: ", token);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App text-white">
        <Navigation logout={logout} />
        <RoutesFunc login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
