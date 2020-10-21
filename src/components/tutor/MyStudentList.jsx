import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Tab, Nav, Table, Badge, ToggleButton, ToggleButtonGroup, Alert, Button, Form, Modal } from 'react-bootstrap';
import "../allrouteStyle/style.scss";

const StudentList = ({ userID, currentUser }) => {
    const [data, setData] = useState('')
    const [total, setTotal] = useState(null)
    const [perPage, setPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [emailModal, setEmailModal] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState('')
    const [emailSubject, setEmailSubject] = useState('')
    const [emailContent, setEmailContent] = useState('')
    const [loading, setLoading] = useState(true)

    const getTotal = async () => {
        const courses = await getCourses();
        if (courses) {
            for (const course of courses) {
                let student = []
                try {
                    const res = await authAxios.get(`/register/student_list/${course._id}`, { withCredentials: true })

                    if (!res) {
                        const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/register/student_list/${course._id}`, {
                            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                            withCredentials: true,
                        })
                        student = secondRes.data
                    } else {
                        student = res.data
                    }
                    setTotal(student.count)
                    console.log(student.count)
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (value) => {
        setCurrentPage(value)
    }

    const getCourses = async () => {
        try {
            const res = await authAxios.get(`/courses/${userID}`, { withCredentials: true })
            let allCourses = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${userID}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                allCourses = secondRes.data
            } else {
                allCourses = res.data
            }
            return allCourses

        } catch (error) {
            console.log(error)
        }

    }

    const getStudents = async () => {
        let allStudents = []
        const courses = await getCourses();
        if (courses) {
            for (const course of courses) {
                let student = []
                let eachList = {}

                try {
                    const skip = (currentPage * perPage) - perPage
                    const res = await authAxios.get(`/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`, { withCredentials: true })

                    if (!res) {
                        const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`, {
                            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                            withCredentials: true,
                        })
                        student = secondRes.data
                    } else {
                        student = res.data
                    }
                    eachList.name = course.name
                    eachList.students = student.data
                    console.log(student)
                    allStudents.push(eachList)
                }
                catch (error) {
                    console.log(error)
                }
            }
            setData(allStudents)
        }
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        const data = {
            "sender": currentUser.email,
            "recipient": recipientEmail,
            "subject": emailSubject,
            "content": emailContent
        }
        console.log(data)
        try {
            const res = await authAxios.post(`/tutor/email/ToStudent`, data, { withCredentials: true })
            let response

            if (!res) {
                const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/tutor/email/ToStudent`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                response = secondRes
            } else {
                response = res
            }
            console.log(response.data)
            setEmailModal(false)

        } catch (error) {
            console.log(error)
            setEmailModal(false)
        }
    }

    useEffect(() => {
        getTotal();
        getStudents()
    }, [currentPage]);

    // console.log(data.length, data)
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {data && (
                                data.map((list, i) => {
                                    return (
                                        <Nav.Item key={i}>
                                            <Nav.Link eventKey={i} className="d-flex justify-content-between btn-link">
                                                <h6>{list.name}</h6>
                                                {/* <Badge variant="light"><h6>{total} Student(s)</h6></Badge> */}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            )}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {data && (
                                data.map((list, i) => {
                                    return (
                                        <Tab.Pane key={i} eventKey={i}>
                                            <Table responsive="sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>Send Message</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.students.map((s, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{currentPage > 1
                                                                    ? i = i + 1 + (perPage * currentPage) - perPage
                                                                    : i = i + 1}
                                                                </td>
                                                                <td>{s.firstname}</td>
                                                                <td>{s.lastname}</td>
                                                                <td>{s.email}</td>
                                                                <td className="text-center">
                                                                    <Button
                                                                        variant="secondary"
                                                                        onClick={() => (setEmailModal(true),
                                                                            setRecipientEmail(s.email))}
                                                                    >
                                                                        <FontAwesomeIcon icon={faUpload} />
                                                                    </Button>
                                                                </td>
                                                                <Modal
                                                                    size="md"
                                                                    show={emailModal}
                                                                    onHide={() => setEmailModal(false)}
                                                                    aria-labelledby="example-modal-sizes-title-sm"
                                                                >
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title id="example-modal-sizes-title-sm">
                                                                            Send Email To {s.firstname} {s.lastname}
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <Form className="d-flex flex-column" onSubmit={sendEmail} >
                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <Form.Group controlId="subject">
                                                                                        <Form.Label>Subject</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            placeholder="Enter Subject"
                                                                                            value={emailSubject}
                                                                                            onChange={(e) => setEmailSubject(e.target.value)}
                                                                                        />
                                                                                    </Form.Group>
                                                                                    <Form.Group controlId="content">
                                                                                        <Form.Label>Content</Form.Label>
                                                                                        <Form.Control
                                                                                            as="textarea"
                                                                                            rows={3}
                                                                                            placeholder="Enter Content"
                                                                                            value={emailContent}
                                                                                            onChange={(e) => setEmailContent(e.target.value)}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                            <div className="d-flex justify-content-center">
                                                                                <Button className="align-self-center mr-4" variant="warning" type="submit">
                                                                                    Send
                                                                                </Button>
                                                                            </div>

                                                                        </Form>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                            <div className="d-flex justify-content-between">
                                                <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="py-3">
                                                    {pageNumbers.map((number) => {
                                                        if (((number === 1) || (number === pageNumbers.length)) || ((number > currentPage - 3) && (number < currentPage + 3))) {
                                                            return (
                                                                <ToggleButton variant="primary" key={number} value={number} onClick={() => changePage(number)}> {number}</ToggleButton>
                                                            )
                                                        }
                                                        else {

                                                            if (number < 3) {
                                                                return (
                                                                    <ToggleButton variant="primary" key={number} value={number} onClick={() => changePage(number)}> {'<<'}</ToggleButton>
                                                                )
                                                            } else if (number > pageNumbers.length - 2) {
                                                                return (
                                                                    <ToggleButton variant="primary" key={number} value={number} onClick={() => changePage(number)}> {'>>'}</ToggleButton>
                                                                )
                                                            }
                                                        }
                                                    })
                                                    }
                                                </ToggleButtonGroup>

                                                <Alert variant="light" className="text-right">page <strong>{currentPage}</strong> of <strong>{pageNumbers.length}</strong></Alert>
                                            </div>
                                        </Tab.Pane>
                                    )
                                })
                            )}
                            {!data && (
                                <p className="text-center" colSpan="5"><strong>No record at the moment</strong></p>
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default StudentList
