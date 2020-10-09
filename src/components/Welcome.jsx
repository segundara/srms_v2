import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const JumBotron = () => {
    return (
        <Jumbotron className="mt-2 shadow-lg" style={{ border: 2 + 'px solid #6351ce', backgroundImage: `url("/road_to_knowledge.png")`, backgroundSize: 'auto auto', backgroundPosition: 'center center', backgroundRepeat: "no-repeat", height: "100vh" }}>
            <div className="text-center">
                <p className="mx-5" style={{ fontFamily: `Amatic SC, cursive`, fontSize: '50px', maxWidth: '100%' }}>
                    <FontAwesomeIcon icon={faQuoteLeft} style={{ color: '#6351ce' }} />
                            The goal of education is the advancement of knowledge and the dissemination of truth.
                        <FontAwesomeIcon icon={faQuoteRight} style={{ color: '#6351ce' }} />
                </p>
                <p>- John F. Kennedy</p>
            </div>
        </Jumbotron>
    )
}

export default JumBotron;
