import React, { useState, useEffect } from 'react';
import { Accordion, Button, Table, Row, Col, Card, Image } from 'react-bootstrap'
import TutorProfile from './Profile'
import StudentList from './MyStudentList'
import ExamsGrades from '../tutor/ExamsGrades';
import "../allrouteStyle/style.scss";

const TutorDetail = ({ userTitle, currentUser, updateUserInfo }) => {

    const updateUser = (newInfo) => { updateUserInfo(newInfo) }

    return (
        <>
            <Row>
                <Col>
                    <Row className="mt-4 mb-2">
                        <Col md={3}>
                            {currentUser && currentUser.image
                                ? <Image src={currentUser.image} className="img-fluid rounded-circle" alt="profile" />
                                : <Image src='https://img.icons8.com/officel/2x/user.png' className="img-fluid rounded-circle" alt="profile" />
                            }
                        </Col>
                        <Col md={9} className="d-flex flex-column justify-content-center">
                            <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                            <strong>{currentUser.email}</strong>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Accordion defaultActiveKey="1">
                <Card className="card mb-4">
                    <Card.Header className="card-header">
                        <Accordion.Toggle as={Button} eventKey="0" className="accordion-nav">
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
                                <TutorProfile
                                    currentUser={currentUser}
                                    updateUser={updateUser}
                                    userTitle={userTitle}
                                />
                            </>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card mb-4">
                    <Card.Header className="card-header">
                        <Accordion.Toggle as={Button} eventKey="1" className="accordion-nav">
                            My Student List
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <StudentList
                                userID={currentUser._id}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card mb-4">
                    <Card.Header className="card-header">
                        <Accordion.Toggle as={Button} eventKey="2" className="accordion-nav">
                            Exams/Grades
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ExamsGrades
                                userID={currentUser._id}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default TutorDetail