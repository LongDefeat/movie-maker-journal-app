import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import "./MovieGenres.css";

function MovieGenres() {
  const currentUser = useContext(UserContext);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    async function fetchGenres() {
      const response = await MovieDatabaseApi.getGenres();
      setGenres(response.genres);
    }
    fetchGenres();
  }, []);

  function handleGenreClick(genreId) {
    setSelectedGenre(genreId);
  }
  return (
    <>
      <div>
        <h1>Genres</h1>
      </div>
      <ul className="genre-list">
        {genres &&
          genres.map((genre) => (
            <li
              key={genre.id}
              className={`genre-item ${
                genre.id === selectedGenre ? "selected-genre" : ""
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </li>
          ))}
      </ul>
    </>
  );
}

export default MovieGenres;
