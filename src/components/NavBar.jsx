import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    state = {

    }

    render() {

        return (
            <div>
                <Navbar collapseOnSelect expand="md" variant="light" bg="light" className="shadow-lg" style={{ backgroundColor: '#343a40', border: 2 + 'px solid #6351ce' }}>
                    <Link to="/">
                        <Navbar.Brand>
                            SCHOOL RECORD MANAGEMENT SYSTEM
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {this.props.location.pathname === '/'
                                ? (<span>
                                    <Nav className="mr-auto" navbar style={{ cursor: 'pointer' }}>
                                        <NavItem>
                                            <Link to="/login"
                                                className={
                                                    this.props.location.pathname === '/login'
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
                                                    this.props.location.pathname === '/logout'
                                                        ? "nav-link active"
                                                        : "nav-link"
                                                }>
                                                Logout
                                            </Link>
                                        </NavItem>
                                    </Nav>
                                </span>)
                            }
                            {/* <Link to="/login"
                                className={
                                    this.props.location.pathname === '/login'
                                        ? "nav-link active"
                                        : "nav-link"
                                }>
                                Login
                            </Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


export default withRouter(NavBar);
