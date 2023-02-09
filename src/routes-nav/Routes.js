import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import PrivateRoute from "./PrivateRoute";
import MovieDetail from "../movies/MovieDetails";
import JournalList from "../journal/JournalList";
import FavoriteList from "../favorites/FavoriteList";
import SeenMovieList from "../seen/SeenMovieList";

/** Site-wide routes.
 * 
 * Parts of site are visitable when logged in.
 * Those routes are wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * Visiting a non-existant route redirects to homepage.
 */

function RoutesFunc({login, signup}){


    return (
        <div>
                <Routes>
                    
                    <Route path="/" element={<Homepage/>} />

                    <Route path="/profile" element={<ProfileForm/>} />

                    <Route path="/login" element={<LoginForm login={login}/>} />

                    <Route path="/signup" element={<SignupForm signup={signup}/>} />

                    <Route path="/movies/:id" element={<MovieDetail />} />

                    <Route path="/journal-list" element={<JournalList />} />

                    <Route path="/favorites" element={<FavoriteList />} />

                    <Route path="/seen" element={<SeenMovieList />} />

                    
                    {/* <PrivateRoute path=""/> */}
                </Routes>
        </div>
    )
}

export default RoutesFunc;
