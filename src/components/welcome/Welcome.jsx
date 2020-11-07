import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import "./style.scss";

const WelcomePage = () => {
    return (
        <Jumbotron className="shadow-lg jumbo text-center">
            <div className="d-flex flex-column mt-5 pt-5">
                <span className="mt-5">Welcome to the School Portal.</span>
                <span>Please <a href="/login">Login</a> to continue.</span>
            </div>
        </Jumbotron>
    )
}

export default WelcomePage;
