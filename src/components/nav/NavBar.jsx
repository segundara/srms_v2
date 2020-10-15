import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import "./style.scss";

const NavBar = (props) => {

    return (
        <div className="py-2 nav-container">
            <Navbar collapseOnSelect expand="md" variant="light" bg="light" className="shadow-lg rounded nav">
                <Link to="/">
                    <Navbar.Brand>
                        SCHOOL RECORD SYSTEM
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {props.location.pathname === '/' || props.location.pathname === '/login'
                            ? (<span>
                                <Nav className="mr-auto" navbar style={{ cursor: 'pointer' }}>
                                    <NavItem>
                                        <Link to="/login"
                                            className={
                                                props.location.pathname === '/login'
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }>
                                            Login
                                            </Link>
                                    </NavItem>
                                </Nav>
                            </span>)
                            : (<span>
                                <Nav className="mr-auto" navbar style={{ cursor: 'pointer' }}>
                                    <NavItem>
                                        <Link to="/logout"
                                            className={
                                                props.location.pathname === '/logout'
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }>
                                            Logout
                                            </Link>
                                    </NavItem>
                                </Nav>
                            </span>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


export default withRouter(NavBar);
