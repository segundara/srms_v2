import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';

const StudentList = () => {
    const [data, setData] = useState(null)
    const [newModal, setNewModal] = useState(false)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [nationality, setNationality] = useState('');
    const [loading, setLoading] = useState(true);


    const getFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const getLastname = (event) => {
        setLastname(event.target.value)
    }
    const getEmail = (event) => {
        setEmail(event.target.value)
    }
    const getDateofbirth = (event) => {
        setDateofbirth(event.target.value)
    }
    const getNationality = (event) => {
        setNationality(event.target.value)
    }

    const registerStudent = () => { }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/student`, { withCredentials: true })
                let allStudents = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/student`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allStudents = secondRes.data
                } else {
                    allStudents = res.data
                }

                setData(allStudents.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, []);

    console.log(data)
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (
                        data.map((student, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{student.firstname}</td>
                                    <td>{student.lastname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.nationality}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </Table>
            <Button onClick={() => setNewModal(true)}>Register New Student</Button>{' '}
            <Modal
                size="sm"
                show={newModal}
                onHide={() => setNewModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add New Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={registerStudent} >
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="firstname">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="What is firstname.."
                                        value={firstname}
                                        onChange={getFirstname}
                                    />
                                </Form.Group>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="What is lastname.."
                                        value={lastname}
                                        onChange={getLastname}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email here.."
                                        value={email}
                                        onChange={getEmail}
                                    />
                                </Form.Group>
                                <Form.Group controlId="dateofbirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Date of Birth..."
                                        value={dateofbirth}
                                        onChange={getDateofbirth}
                                    />
                                </Form.Group>
                                <Form.Group controlId="nationality">
                                    <Form.Label>Nationality</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nationality..."
                                        value={nationality}
                                        onChange={getNationality}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button className="align-self-center mr-4" variant="warning" type="submit">
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default StudentList
