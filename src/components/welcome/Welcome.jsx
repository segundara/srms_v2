import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const JumBotron = () => {
    return (
        <Jumbotron className="shadow-lg jumbo">
            <div className="text-center qoute">
                Welcome to the School Portal. Please <a href="/login">Login</a> to continue.
            </div>
        </Jumbotron>
    )
}

export default JumBotron;
