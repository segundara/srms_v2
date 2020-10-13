import React, { useState, useEffect } from 'react';
import { Table, Alert, Button } from 'react-bootstrap';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import download from 'downloadjs'
import "./style.scss";

const ExamsGrades = ({ userID, updateData }) => {
    const [data, setData] = useState(null)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [loading, setLoading] = useState(true)

    const getPDF = async () => {
        try {
            const res = await authAxios.get(`/exams/${userID}/pdf`, { responseType: 'blob', withCredentials: true })
            let result = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    responseType: 'blob',
                    withCredentials: true,
                })
                result = await secondRes
            } else {
                result = await res
            }
            const content = result.headers['content-type'];
            download(result.data, 'Transcript', content)

            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000);

        } catch (error) {
            console.log(error)
            setFailure(true)
            setTimeout(() => {
                setFailure(false)
            }, 5000);
        }

    }

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
                <Alert variant="info" show={success} >
                    <strong>Record downloaded</strong>
                </Alert>
                <Alert variant="danger" show={failure} >
                    <strong>
                        Something went wrong!!!
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
                <Button variant="secondary" onClick={getPDF}>Download Transcript</Button>{' '}
            </div>
        </>
    )
}
export default ExamsGrades