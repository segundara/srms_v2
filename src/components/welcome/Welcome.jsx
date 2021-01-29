import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import "./style.scss";

const WelcomePage = () => {
    return (
        <Jumbotron className="shadow-lg jumbo text-center">
            <div className="d-flex flex-column mt-5 pt-5">
                <span className="mt-5">Welcome to the School Portal.</span>
                <span>Login details can be found in <a href="https://srms-be.herokuapp.com/api-docs">api-docs</a></span>
            </div>
        </Jumbotron>
    )
}

export default WelcomePage;
