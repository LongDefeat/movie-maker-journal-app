import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import UserDatabaseApi from "../api/UserDatabaseApi";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import MovieCardList from "../movies/MovieCardList";

/** Parent Function --> MovieCard */

function SeenMovieList(){
    const [seenMovies, setSeenMovies] = useState(null);
    const {currentUser} = useContext(UserContext);

    if (!currentUser) return <LoadingSpinner />

    useEffect(function getSeenMovieHistoryOnMount(){
        async function getSeenMovies(user_id){
           let seenMovieHistory = await UserDatabaseApi.getSeenMovies(user_id);
           setSeenMovies(seenMovieHistory);
           };
           getSeenMovies(currentUser.id);
   }, [currentUser.id]);

   if (!seenMovies) return <LoadingSpinner />

    return (
        <Container className="py-5 text-center">
        
            <h1 className="mb-5">Movie History</h1>
            <MovieCardList movies={seenMovies} />
        </Container>
    )
}

export default SeenMovieList;