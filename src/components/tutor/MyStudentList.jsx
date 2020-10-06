import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Row, Col, Tab, Nav, Table, Badge } from 'react-bootstrap';

function StudentList({ userID, studentsRecord }) {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

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
        const getStudents = async () => {
            const courses = await getCourses();
            for (const course of courses) {
                let student = []
                let eachList = {}

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
                    eachList.name = course.name
                    eachList.students = student.data
                    allStudents.push(eachList)
                }
                catch (error) {
                    console.log(error)
                }
            }
            setData(allStudents)
            studentsRecord(allStudents)
        }
        getStudents()
    }, []);

    console.log(data.length, data)
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
                                                <h5>{list.name}</h5>
                                                <Badge variant="light"><h5>{list.students.length} Student(s)</h5></Badge>
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
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.students.map((s, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{s.firstname}</td>
                                                                <td>{s.lastname}</td>
                                                                <td>{s.email}</td>
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

export default StudentList
