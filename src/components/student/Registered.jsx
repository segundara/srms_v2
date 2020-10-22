import React, { useState, useEffect } from 'react';
import { Table, Alert, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import "../allrouteStyle/style.scss";

const MyCourses = ({ userID, updateData }) => {
    const [data, setData] = useState('')
    const [total, setTotal] = useState(null)
    const [perPage, setPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const getTotal = async () => {
        try {
            const res = await authAxios.get(`/register/course_list/${userID}`, { withCredentials: true })
            let allCourses = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/register/course_list/${userID}`, {
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

    const fetchData = async () => {
        try {
            const skip = (currentPage * perPage) - perPage
            const res = await authAxios.get(`/register/course_list/${userID}?limit=${perPage}&offset=${skip}`, { withCredentials: true })
            let allCourses = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`, {
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
    }, [updateData, currentPage]);

    return (
        <div>
            {data && data.length > 0 ? (
                <>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Description</th>
                                <th>Semester</th>
                                <th>Registration Date</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((course, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentPage > 1
                                            ? i = i + 1 + (perPage * currentPage) - perPage
                                            : i = i + 1}
                                        </td>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>{course.semester}</td>
                                        <td>{course.reg_date.slice(0, 10)}</td>
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
                </>
            ) : (
                    <div className="text-center" colSpan="5">
                        <strong>No record at the moment</strong>
                    </div>
                )
            }
        </div>
    )
}
export default MyCourses