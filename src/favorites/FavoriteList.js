import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import UserDatabaseApi from "../api/UserDatabaseApi";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import MovieCardList from "../movies/MovieCardList";

/** Parent Function --> MovieCard */

function FavoriteList(){
    const [favorites, setFavorites] = useState(null);
    const {currentUser} = useContext(UserContext);
    const [favoriteDisplay, setFavoriteDisplay] = useState(false);

    if (!currentUser) return <LoadingSpinner />
   
    
    useEffect(function getFavoritesOnMount(){
         async function getFavorites(user_id){
            let favoriteMovies = await UserDatabaseApi.getFavorites(user_id);
            setFavorites(favoriteMovies);
            };
            getFavorites(currentUser.id);
    }, [currentUser.id]);

    if (!favorites) return <LoadingSpinner />

    return (
        <Container className="py-5 text-center">
        
            <h1 className="mb-5">Favorites List</h1>
            <MovieCardList movies={favorites} />
        </Container>
    )
}

export default FavoriteList;