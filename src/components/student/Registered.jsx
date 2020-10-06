import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"

const MyCourses = ({ userID, updateData }) => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
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

                setData(allCourses.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [updateData]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Semester</th>
                        <th>Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((course, i) => {
                            return (
                                <tr key={i}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.semester}</td>
                                    <td>{course.reg_date.slice(0, 10)}</td>
                                </tr>
                            )
                        })
                    ) : (
                            <tr>
                                <td className="text-center" colSpan="5"><strong>No record at the moment</strong></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default MyCourses