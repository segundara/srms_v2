import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import "./style.scss";
import { Table, Button, Form, Modal, Row, Col, ButtonGroup, DropdownButton, Dropdown, Alert } from 'react-bootstrap';

const CourseList = () => {
    const [data, setData] = useState(null)
    const [tutors, setTutors] = useState([]);
    const [newModal, setNewModal] = useState(false)
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [semester, setSemester] = useState('');
    const [examdate, setExamdate] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');
    const [lecturerID, setLecturerID] = useState('');
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [loading, setLoading] = useState(true);

    const getCourseName = (event) => {
        setCourseName(event.target.value)
    }
    const getDescription = (event) => {
        setDescription(event.target.value)
    }
    const getSemester = (event) => {
        setSemester(event.target.value)
    }
    const getExamdate = (event) => {
        setExamdate(event.target.value)
    }

    const addNewCourse = async (e) => {
        e.preventDefault()
        const data = {
            "name": courseName,
            "description": description,
            "semester": semester,
            "lecturerid": lecturerID,
            "examdate": examdate
        }

        try {
            const res = await authAxios.post(`/courses`, data, { withCredentials: true })
            let response = []

            if (!res) {
                const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/courses`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                response = await secondRes.data
            }
            else {
                response = await res.data
            }

            console.log("New course added=> ", response)
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
                const res = await authAxios.get(`/courses`, { withCredentials: true })
                let allCourses = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allCourses = secondRes.data
                } else {
                    allCourses = res.data
                }

                setData(allCourses.data)

                const response = await authAxios.get(`/tutor`, { withCredentials: true })
                let allTutors = []

                if (!response) {
                    const secondResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tutor`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allTutors = secondResponse.data
                } else {
                    allTutors = response.data
                }

                setTutors(allTutors.data)
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
                        <th>Name</th>
                        <th>Description</th>
                        <th>Semester</th>
                        <th>Exam Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (
                        data.map((course, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.semester}</td>
                                    <td>{course.examdate.slice(0, 10)}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => setNewModal(true)}>Add New Course</Button>{' '}
            <Modal
                size="lg"
                show={newModal}
                onHide={() => setNewModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add New Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={addNewCourse} >
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="courseName">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Course name here..."
                                        value={courseName}
                                        onChange={getCourseName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description..."
                                        value={description}
                                        onChange={getDescription}
                                    />
                                </Form.Group>
                                <Form.Group controlId="semester">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Period of teaching..."
                                        value={semester}
                                        onChange={getSemester}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="examdate">
                                    <Form.Label>Exam Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Date to conduct exam..."
                                        value={examdate}
                                        onChange={getExamdate}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Label>Select Tutor</Form.Label>
                                <DropdownButton
                                    as={ButtonGroup}
                                    className="mx-3"
                                    key="right"
                                    id={`dropdown-button-drop-right`}
                                    drop="right"
                                    variant="secondary"
                                    title={selectedTutor.toUpperCase()}
                                >
                                    {tutors.map((key, i) => {
                                        return (
                                            <Dropdown.Item key={i} eventKey={key._id} onClick={() => (setSelectedTutor(`${key.firstname} ${key.lastname}`), setLecturerID(key._id))}>{key.firstname} {key.lastname}</Dropdown.Item>
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

export default CourseList
