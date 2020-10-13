import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import "./style.scss";
import { Table, Button, Form, Modal, Row, Col, ButtonGroup, DropdownButton, Dropdown, Alert } from 'react-bootstrap';

const TutorList = () => {
    const [data, setData] = useState(null)
    const [newModal, setNewModal] = useState(false)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedID, setSelectedID] = useState('');
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
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
    const getPassword = (event) => {
        setPassword(event.target.value)
    }

    const registerTutor = async (e) => {
        e.preventDefault()
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "departmentid": selectedID,
            "password": password,
            "title": "tutor"
        }

        try {
            const res = await authAxios.post(`/tutor/register`, data, { withCredentials: true })
            let response = []

            if (!res) {
                const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/tutor/register`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                response = await secondRes.data
            }
            else {
                response = await res.data
            }

            console.log("New tutor added=> ", response)
            setNewModal(false)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000);

        } catch (error) {
            console.log(error)
            setNewModal(false)
            setFailure(true)
            setTimeout(() => {
                setFailure(false)
            }, 10000);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/tutor`, { withCredentials: true })
                let allTutors = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/tutor`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allTutors = secondRes.data
                } else {
                    allTutors = res.data
                }

                setData(allTutors.data)

                const response = await authAxios.get(`/departments`, { withCredentials: true })
                let allDepartments = []

                if (!response) {
                    const secondResponse = await axios.get(`${process.env.REACT_APP_API_URL}/departments`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allDepartments = secondResponse.data
                } else {
                    allDepartments = response.data
                }

                setDepartments(allDepartments.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [success]);

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (
                        data.map((tutor, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{tutor.firstname}</td>
                                    <td>{tutor.lastname}</td>
                                    <td>{tutor.email}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => setNewModal(true)}>Register New Tutor</Button>{' '}
            <Modal
                size="lg"
                show={newModal}
                onHide={() => setNewModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add New Tutor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={registerTutor} >
                        <Row>
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password..."
                                        value={password}
                                        onChange={getPassword}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Label>Select Department</Form.Label>
                                <DropdownButton
                                    as={ButtonGroup}
                                    className="mx-3"
                                    key="right"
                                    id={`dropdown-button-drop-right`}
                                    drop="right"
                                    variant="secondary"
                                    title={selectedDept.toUpperCase()}
                                >
                                    {departments.map((key, i) => {
                                        return (
                                            <Dropdown.Item key={i} eventKey={key.name} onClick={() => (setSelectedDept(key.name), setSelectedID(key._id))}>{key.name}</Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-3">
                            <Button className="align-self-center mr-4" variant="warning" type="submit">
                                Add Tutor
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default TutorList
