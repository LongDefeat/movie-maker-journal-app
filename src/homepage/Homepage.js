import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import SearchMovieList from "../movies/SearchMovieList";
import PopularMovies from "./PopularMovies";
import "./Homepage.css";
import UpcomingMovies from "./UpcomingMovies";

/** Homepage for Movie Maker Journal
 *
 * Displays welcome message to user and allows user to create
 * login and/or search for movies
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <Container className="py-5">
      <div className="Homepage">
        <div>
          <h1 className="Title">The Movie Maker Journal</h1>
          <h3>
            Millions of movies to discover from around the world... Explore!
          </h3>

          {currentUser ? (
            <h2>
              Welcome Back, {currentUser.firstName || currentUser.username}!
            </h2>
          ) : null}
        </div>
        <div>
          <SearchMovieList />
        </div>
        <div>
          <PopularMovies />
        </div>
        <div>
          <UpcomingMovies />
        </div>
      </div>
    </Container>
  );
}

export default Homepage;
