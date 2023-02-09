import React, { useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { GiPopcorn } from "react-icons/gi";
import { HiEye } from "react-icons/hi";
import { GiMagnifyingGlass } from "react-icons/gi";
import "./MovieCard.css";
import UserDatabaseApi from "../api/UserDatabaseApi";


/** Show limited info about a movie
 *
 * Is rendered by MovieCardList to display a "card" for each movie.
 *
 * Receives watched function prop from a parent, which is called on "Seen".
 *
 * MovieCardList --> MovieCard
 */

const unavailableImage = require('./unavailablePoster.jpeg');


function MovieCard({ id, title, poster, overview, voteAverage, releaseDate }) {
  const currentUser = useContext(UserContext);

  let basePosterPath = `https://image.tmdb.org/t/p/w500`;
  let fullImagePath = `${basePosterPath}${poster}`;

  if(!poster){
    fullImagePath = unavailableImage;
  }


  async function addFavorite(user_id, movie_id) {
    await UserDatabaseApi.addFavorite(user_id, movie_id);
  }

  async function addSeen(user_id, movie_id){
    await UserDatabaseApi.addSeen(user_id, movie_id);
  }

  const date = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const rating = Math.floor((voteAverage / 10) * 100);

  const renderSeen = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Seen
    </Tooltip>
  );

  const renderDetails = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Details
    </Tooltip>
  );

  const renderLike = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Like
    </Tooltip>
  );

  return (
    <>
      <div>
        <Card className="text-dark mb-3 MovieCard">
          <Card.Img variant="top" src={`${fullImagePath}`} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <div>Avg Rating: {rating}%</div>
              <div>{date}</div>
            </Card.Text>
                <Row className="justify-content-center">
                  <Col className="col-auto">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderSeen}>
                        <Button
                        variant="primary"
                        onClick={() => addSeen(currentUser.currentUser.id, id)}
                        size="sm"
                        className="font-weight-bold text-uppercase">
                        <HiEye /> 
                        </Button>
                    </OverlayTrigger>
                  </Col>
                  <Col className="col-auto">
                    <Link to={`/movies/${id}`}>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderDetails}>
                        <Button
                        size="sm"
                        variant="info"
                        className="font-weight-bold text-uppercase"
                        >
                        <GiMagnifyingGlass /> 
                        </Button>
                    </OverlayTrigger>
                    </Link>
                  </Col>

                  <Col className="col-auto">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderLike}>
                      <Button
                          size="sm"
                          onClick={() => addFavorite(currentUser.currentUser.id, id)}
                          variant="warning"
                          className="font-weight-bold text-uppercase">
                          <GiPopcorn size={20} />   
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              
          
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default MovieCard;
