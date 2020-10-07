import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Row, Col, Tab, Nav, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function ExamsGrades({ userID, studentsRecord }) {
    const [data, setData] = useState('')
    const [grade, setGrade] = useState('')
    const [gradeModal, setGradeModal] = useState(false)
    const [examid, setExamid] = useState('')
    const [studentid, setStudentid] = useState('')
    const [loading, setLoading] = useState(true)

    const getGrade = (event) => {
        setGrade(event.target.value)
    }

    const updateGrade = async (e) => {
        e.preventDefault()
        console.log("examid: ", examid, "studentid: ", studentid)
        const data = {
            "grade": grade
        }

        try {
            const res = await authAxios.put(`/exams/${studentid}/${examid}`, data, {
                withCredentials: true
            })

            let response = []

            if (!res) {
                const secondRes = await axios.put(`${process.env.REACT_APP_API_URL}/exams/${studentid}/${examid}`, data, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                    withCredentials: true,
                })
                response = secondRes.data
            } else {
                response = res.data
            }

            console.log("response from gradeUpdate=>", response)

            setGradeModal(false)

        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log(err.response.data.msg);
            }
            setGradeModal(false)
        }

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

    useEffect(() => {
        let allStudents = []
        const getExamsRecords = async () => {
            const courses = await getCourses();
            for (const course of courses) {
                let student = []
                let eachRecord = {}

                try {
                    const res = await authAxios.get(`/exams/student_list/${course._id}`, { withCredentials: true })

                    if (!res) {
                        const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}`, {
                            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                            withCredentials: true,
                        })
                        student = secondRes.data
                    } else {
                        student = res.data
                    }
                    eachRecord.name = course.name
                    eachRecord.students = student.data
                    console.log(student)
                    allStudents.push(eachRecord)
                }
                catch (error) {
                    console.log(error)
                }
            }
            setData(allStudents)
        }
        getExamsRecords()
    }, [gradeModal]);

    console.log(data)
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
                                            <Nav.Link eventKey={i} className="d-flex justify-content-between">
                                                <h6>{list.name}</h6>
                                                <Badge variant="light"><h6>{list.students.length} Student(s)</h6></Badge>
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
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Exam date</th>
                                                        <th>Grade</th>
                                                        <th>Upload Grade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.students.map((s, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{s.firstname}</td>
                                                                <td>{s.lastname}</td>
                                                                <td>{s.examdate.slice(0, 10)}</td>
                                                                <td>{s.grade}</td>
                                                                <td className="text-center">
                                                                    <Button
                                                                        variant="info"
                                                                        onClick={() => (setGradeModal(true),
                                                                            setExamid(s._id), setStudentid(s.studentid))}
                                                                    >
                                                                        <FontAwesomeIcon icon={faUpload} />
                                                                    </Button>
                                                                </td>
                                                                <Modal
                                                                    size="sm"
                                                                    show={gradeModal}
                                                                    onHide={() => setGradeModal(false)}
                                                                    aria-labelledby="example-modal-sizes-title-sm"
                                                                >
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title id="example-modal-sizes-title-sm">
                                                                            Update Grade
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <Form className="d-flex flex-column" onSubmit={updateGrade} >
                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <Form.Group controlId="grade">
                                                                                        <Form.Label>Grade</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            placeholder="Enter Grade"
                                                                                            value={grade}
                                                                                            onChange={getGrade}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                            <div className="d-flex justify-content-center">
                                                                                <Button className="align-self-center mr-4" variant="warning" type="submit">
                                                                                    Update Grade
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
                                        </Tab.Pane>
                                    )
                                })
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>



        </div>
    )
}

export default ExamsGrades
