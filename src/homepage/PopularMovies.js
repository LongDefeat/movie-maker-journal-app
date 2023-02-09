import React, { useState, useEffect } from "react";
import MovieCardList from "../movies/MovieCardList";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";

export default function PopularMovies(){
    const [movies, setMovies] = useState(null);

    useEffect(function getPopularMoviesOnMount(){
        async function getPopularMovies(){
            setMovies(await MovieDatabaseApi.getPopMovies());
        }
        getPopularMovies();
    }, []);
    if (!movies) return LoadingSpinner;
    
    
    return (
        <>
            <h1 className="py-3">Popular Movies</h1>
            <MovieCardList movies={movies.results} />
        </>
    )
}

