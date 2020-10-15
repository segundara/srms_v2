import React, { useState, useEffect } from 'react';
import { Accordion, Button, Table, Row, Col, Card, Image } from 'react-bootstrap'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import TutorProfile from './Profile'
import StudentList from './MyStudentList'
import ExamsGrades from '../tutor/ExamsGrades';
import "./style.scss";

const TutorDetail = ({ userTitle }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [studentsRecord, setStudentsRecord] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/${userTitle}/me`, { withCredentials: true })
                // const res = await axios.get(`/${userTitle}/me`,
                //     {
                //         baseURL: process.env.REACT_APP_API_URL,
                //         headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                //     }
                // )
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
    const getRecords = (newData) => { setStudentsRecord(newData) }

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
                                                updateUser={updateUserinfo}
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
                                    <Card.Body><StudentList userID={currentUser._id} studentsRecord={getRecords} /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="card mb-4">
                                <Card.Header className="card-header">
                                    <Accordion.Toggle as={Button} eventKey="2" className="accordion-nav">
                                        Exams/Grades
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body><ExamsGrades userID={currentUser._id} studentsRecord={studentsRecord} /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </>
                )}
        </>
    )
}

export default TutorDetail