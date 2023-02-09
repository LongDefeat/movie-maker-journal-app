import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Higher-Order Component for private routes.
 * 
 * These check if a current user is valid or not. If so, it will continue to the
 * route. If no user, it redirects to homepage.
 */

function PrivateRoute({ exact, path, children }){
    const { currentUser } = useContext(UserContext);

    console.debug(
        "PrivateRoute",
        "exact= ", exact,
        "path= ", path,
        "currentUser= ", currentUser,
    );

    if (!currentUser) {
        return <useNavigate href="/login" />
    };

    return (
        <Route exact={exact} path={path} element={children} />
    )
}

export default PrivateRoute;