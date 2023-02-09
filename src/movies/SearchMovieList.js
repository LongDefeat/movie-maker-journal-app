import React, { useState, useEffect } from "react";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import MovieCardList from "./MovieCardList";
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";

/** Display page with list of movies.
 * 
 * On mount, loads movies from API.
 * 
 * Re-loads filtered movies on submit form
 * 
 * MovieList --> MovieCardList --> MovieCard
 * 
 */

function SearchMovieList(){
    const [movies, setMovies] = useState(null);

    async function search(name){
        let movies = await MovieDatabaseApi.searchMovie(name);
        setMovies(movies);
    };


    return (
        <div className="MovieList">
           <SearchForm search={search}/>
            {movies
                    ? (<MovieCardList movies={movies.results}/>)
                    : (null)
            }
        </div>
    );

}

export default SearchMovieList;


