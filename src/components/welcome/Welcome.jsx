import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const JumBotron = () => {
    return (
        <Jumbotron className="shadow-lg jumbo text-center">
            <div className="d-flex flex-column mt-5 pt-5">
                <span className="mt-5">Welcome to the School Portal.</span> 
                <span>Please <a href="/login">Login</a> to continue.</span>
            </div>
        </Jumbotron>
    )
}

export default JumBotron;
