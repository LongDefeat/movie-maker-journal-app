import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";
import MovieDatabaseApi from "../api/MovieDatabaseApi";

function MovieGenres() {
  const currentUser = useContext(UserContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await MovieDatabaseApi.getGenres();
      setGenres(response.genres);
    }
    fetchGenres();
  }, []);

  return (
    <>
      <div>
        <h1>Genres</h1>
        {genres && (
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default MovieGenres;
