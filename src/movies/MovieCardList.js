import React from "react";
import MovieCard from "./MovieCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MovieCardList({ movies }) {
  return (
    <div>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} xxl={8} className="g-4">
        {movies.length ? (
          movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                overview={movie.overview}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
              />
            </Col>
          ))
        ) : (
          <p>Sorry, no results were found...</p>
        )}
      </Row>
    </div>
  );
}

export default MovieCardList;
