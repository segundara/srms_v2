import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Table, Toast, Alert } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns'

const AllCourses = ({ userID, updateData }) => {
    const [data, setData] = useState(null)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [loading, setLoading] = useState(true)

    const registerCourse = async (courseid, examdate) => {
        // console.log(id, userID, format(new Date(), 'yyyy-MM-dd'))
        const data = {
            "studentid": userID,
            "courseid": courseid,
            "reg_date": format(new Date(), 'yyyy-MM-dd'),
            "examdate": examdate
        }

        try {
            const res = await authAxios.post(`/register`, data, { withCredentials: true })
            let response = []

            if (!res) {
                const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/register`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                response = await secondRes
            }
            else {
                response = await res
            }

            // if (response.status === 200) {
            console.log(response.data)
            updateData(response.data)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000);
            // }

        } catch (error) {
            console.log(error)
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
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, []);

    return (
        <>
            <div>
                <Alert variant="info" show={success} >
                    <strong>Course registration successful!!!</strong>
                </Alert>
                <Alert variant="danger" show={failure} >
                    <strong>
                        Ooops!!! Seems you have enrolled for this course. Check out with the admin if not!
                    </strong>
                </Alert>
            </div>
            <div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Semester</th>
                            <th>Exam Date</th>
                            <th>Click To Register</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            data.map((course, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>{course.semester}</td>
                                        <td>{course.examdate.slice(0, 10)}</td>
                                        <td className="text-center">
                                            <Button
                                                variant="info"
                                                onClick={() => registerCourse(course._id, course.examdate)}
                                            >
                                                <FontAwesomeIcon icon={faRegistered} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default AllCourses