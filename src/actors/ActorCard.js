import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./ActorCard.css";

const unavailableImage = require('./unavailable.jpeg');

/** Display actors in a given film */


function ActorCard({name, character, picture}){

    let basePosterPath = `https://image.tmdb.org/t/p/w500`;
    let fullImagePath = `${basePosterPath}${picture}`;
    

    console.log(picture)

    if(!picture){
      fullImagePath = unavailableImage;
    }
    
    return (
        <>
            <Card>
                <Card.Img variant="top" className="img-fluid" src={`${fullImagePath}`} />
                <Card.Body className="text-dark">
                  <h5>{name}</h5>
                  <h6>{character}</h6>
                </Card.Body>                                                          
            </Card>
        </>
    )
}

export default ActorCard;