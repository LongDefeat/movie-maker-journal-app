import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import JournalForm from "../journal/JournalForm";
import UserContext from "../auth/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import ActorCard from "../actors/ActorCard";
import "./MovieDetails.css";
import LoadingSpinner from "../common/LoadingSpinner";
import MovieRecommendations from "./MovieRecommendations";
import WatchProviders from "./WatchProviders";

function MovieDetail() {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let basePosterPath = `https://image.tmdb.org/t/p/w500`;

  let providerPath = `https://api.themoviedb.org/3/movie`;

  useEffect(
    function getMovieDetailsForUser() {
      async function getMovie() {
        setMovie(await MovieDatabaseApi.getMovie(id));
      }
      getMovie();
    },
    [id]
  );

  if (!movie) return <LoadingSpinner />;

  const {
    release_date,
    original_title,
    overview,
    revenue,
    vote_average,
    runtime,
    poster_path,
    video,
  } = movie.details;

  const year = new Date(release_date).toLocaleDateString("en-US", {
    year: "numeric",
  });

  const rating = Math.floor((vote_average / 10) * 100);

  const date = new Date(release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const currencyRevenue = revenue
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const castMembers = movie.cast;

  function MyVerticallyCenteredModal(props) {
    function handleSave() {
      // saves movie journal entry and shows alert of saved content
      props.onHide();
      setShowAlert(true);

      // Hide save alert after a short delay
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
    return (
      <Modal
        {...props}
        size="lg"
        className="fade"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onSubmit={handleSave}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {original_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JournalForm
            movieTitle={original_title}
            movieId={movie.details.id}
            userId={currentUser.id}
            closeModal={props.onHide}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function displayMovieDetails() {
    return (
      <>
        <Container className="movie-details-container py-5">
          <Row className="align-items-center">
            <Col md={4}>
              <img
                className="img-fluid"
                src={`${basePosterPath}${poster_path}`}
              />
            </Col>

            <Col md={8}>
              <h1 className="movie-title">
                {original_title} ({year})
              </h1>
              <p>
                <span
                  style={{
                    border: "1px solid white",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  PG-13
                </span>{" "}
                • {date} • {runtime} minutes
              </p>
              <p>Overview: {overview}</p>
              <p>Worldwide Revenue: ${currencyRevenue}</p>
              <p>Average User Rating: {rating}%</p>
              <p>Trailer: {video}</p>
              <p>
                Streaming: {<WatchProviders movieId={id} countryCode="US" />}
              </p>
              <Button
                onClick={() => setModalShow(true)}
                variant="outline-primary"
                color="success"
                className="font-weight-bold"
              >
                Log Movie <FaPencilAlt />
              </Button>
            </Col>
          </Row>
          <Row
            style={{ flexWrap: "nowrap", overflowX: "scroll" }}
            className="mt-5"
          >
            {castMembers.map((m) => {
              return (
                <>
                  <Col md={2}>
                    <ActorCard
                      name={m.name}
                      character={m.character}
                      picture={m.profile_path}
                    />
                  </Col>
                </>
              );
            })}
          </Row>
          <Row>
            <MovieRecommendations movie_id={id} />
          </Row>
        </Container>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  return (
    <>
      {movie && displayMovieDetails()}
      <div></div>
    </>
  );
}

export default MovieDetail;
