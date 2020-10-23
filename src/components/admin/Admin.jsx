import React from 'react';
import { Accordion, Button, Table, Row, Col, Card, Image } from 'react-bootstrap'
import AdminProfile from './Profile'
import StudentList from './StudentList';
import TutorList from './TutorList';
import CourseList from './CourseList';
import "../allrouteStyle/style.scss";

const AdminDetail = ({ userTitle, currentUser, updateUserInfo }) => {

    const updateUser = (newInfo) => { updateUserInfo(newInfo) }

    return (
        <>
            {/* <Row>
                <Col> */}
            <Row className="mt-4 mb-2">
                <Col md={3} className="text-center mb-3">
                    {currentUser && currentUser.image
                        ? <Image src={currentUser.image} className="img-fluid rounded-circle" alt="profile" />
                        : <Image src='https://img.icons8.com/officel/2x/user.png' className="img-fluid rounded-circle" alt="profile" />
                    }
                    <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                    <strong>{currentUser.email}</strong>
                </Col>
                <Col md={9} className="d-flex flex-column justify-content-center">
                    <Accordion defaultActiveKey="1">
                        <Card className="mb-4 card">
                            <Card.Header>
                                <Accordion.Toggle eventKey="0" className="accordion-nav">
                                    My Account
                                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <>
                                        <Table responsive="sm">
                                            <thead>
                                                <tr>
                                                    <th className="text-left" colSpan="2">Profile Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>First Name</td>
                                                    <td><strong>{currentUser.firstname}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>
                                                    <td><strong>{currentUser.lastname}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td><strong>{currentUser.email}</strong></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <AdminProfile
                                            currentUser={currentUser}
                                            updateUser={updateUser}
                                            userTitle={userTitle}
                                        />
                                    </>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="mb-4 card">
                            <Card.Header>
                                <Accordion.Toggle eventKey="1" className="accordion-nav">
                                    Student List
                                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <StudentList />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="mb-4 card">
                            <Card.Header>
                                <Accordion.Toggle eventKey="2" className="accordion-nav">
                                    Tutor List
                                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <TutorList />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="mb-4 card">
                            <Card.Header>
                                <Accordion.Toggle eventKey="3" className="accordion-nav">
                                    Course List
                                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <CourseList />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
            {/* </Col>
            </Row> */}
        </>
    )
}

export default AdminDetail