import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Table, Toast, Alert, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns'
import "../allrouteStyle/style.scss";

const AllCourses = ({ userID, updateData }) => {
    const [data, setData] = useState(null)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [total, setTotal] = useState(null)
    const [perPage, setPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const getTotal = async () => {
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
            setTotal(allCourses.count)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (value) => {
        setCurrentPage(value)
    }

    const registerCourse = async (courseid, examdate) => {
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

    const fetchData = async () => {
        try {
            const skip = (currentPage * perPage) - perPage
            const res = await authAxios.get(`/courses?limit=${perPage}&offset=${skip}`, { withCredentials: true })
            let allCourses = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`, {
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

    useEffect(() => {
        getTotal();
        fetchData();
    }, [currentPage]);

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
                <Table responsive="sm">
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
                                                variant="secondary"
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

            </div>
        </>
    )
}
export default AllCourses