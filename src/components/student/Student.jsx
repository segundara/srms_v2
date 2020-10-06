import React, { useState, useEffect } from 'react';
import { Accordion, Button, Table, Row, Col, Card, Image } from 'react-bootstrap'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import StudentProfile from './Profile';
import AllCourses from './Courses';
import MyCourses from './Registered';
import ExamsGrades from './ExamsGrades';

const StudentDetail = ({ userTitle }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/${userTitle}/me`, { withCredentials: true })
                let currentUser = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    currentUser = secondRes.data
                } else {
                    currentUser = res.data
                }

                setCurrentUser(currentUser)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, []);

    const updateUserinfo = (newInfo) => { setCurrentUser(newInfo) }
    const updateData = (newData) => { setUserData(newData) }

    return (
        <>
            {loading ? <div>...loading</div>
                : (
                    <>
                        <Row>
                            <Col>
                                <Row className="mt-4 mb-2">
                                    <Col md={3}>
                                        {currentUser && currentUser.image
                                            ? <Image src={currentUser.image} className="img-fluid" alt="profile" />
                                            : <Image src='https://img.icons8.com/officel/2x/user.png' className="img-fluid" alt="profile" />
                                        }
                                    </Col>
                                    <Col md={9} className="d-flex flex-column justify-content-center">
                                        <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                                        <strong>{currentUser.email}</strong>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        My Account
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" colSpan="2">Profile Detail</th>
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
                                                    <tr>
                                                        <td>D.O.B</td>
                                                        <td><strong>{currentUser.dateofbirth.slice(0, 10)}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nationality</td>
                                                        <td><strong>{currentUser.nationality}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <StudentProfile
                                                currentUser={currentUser}
                                                updateUser={updateUserinfo}
                                                userTitle={userTitle}
                                            />
                                        </>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Available Courses
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body><AllCourses userID={currentUser._id} updateData={updateData} /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        My Course List
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body><MyCourses userID={currentUser._id} updateData={userData} /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        My Exams/Grades
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body><ExamsGrades userID={currentUser._id} updateData={userData} /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </>
                )}
        </>
    )
}

export default StudentDetail