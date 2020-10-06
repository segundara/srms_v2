import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"

const ExamsGrades = ({ userID, updateData }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/exams/${userID}`, { withCredentials: true })
                let examInfo = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/exams/${userID}`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    examInfo = secondRes.data
                } else {
                    examInfo = res.data
                }

                setData(examInfo.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [updateData]);

    console.log(data)

    return (
        <>
            <div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Semester</th>
                            <th>Exam Date</th>
                            <th>Grade</th>
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
                                        <td>{course.examdate.slice(0, 10)}</td>
                                        <td>{course.grade}</td>
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
        </>
    )
}
export default ExamsGrades