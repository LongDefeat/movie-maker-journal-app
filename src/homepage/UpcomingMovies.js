import React, { useState, useEffect } from "react";
import MovieCardList from "../movies/MovieCardList";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";

export default function UpcomingMovies(){
    const [movies, setMovies] = useState(null);

    useEffect(function getUpcomingMoviesOnMount(){
        async function getUpcomingMovies(){
            setMovies(await MovieDatabaseApi.getUpcomingNewMovies());
        }
        getUpcomingMovies();
    }, []);
    if (!movies) return LoadingSpinner;
    console.log(movies);
    
    return (
        <>
            <h1 className="py-3">Upcoming Movies</h1>
            <MovieCardList movies={movies.results} />
        </>
    )
}