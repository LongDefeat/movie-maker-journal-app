import React from "react";
import MovieDatabaseApi from "../api/MovieDatabaseApi";

function MovieGenres() {
  const currentUser = useContext(UserContext);
  const [genres, setGenres] = useState(null);

  async function getGenreList() {
    setGenres(await MovieDatabaseApi.getGenres(), []);
  }

  return (
    <>
      <div>
        <h1>Genres</h1>
      </div>
    </>
  );
}

export default MovieGenres;
