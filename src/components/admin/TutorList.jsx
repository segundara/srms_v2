import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Table } from 'react-bootstrap';

const TutorList = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/tutor`, { withCredentials: true })
                let allTutors = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/tutor`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    allTutors = secondRes.data
                } else {
                    allTutors = res.data
                }

                setData(allTutors.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, []);

    console.log(data)
    return (
        <div>
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
                    {data && (
                        data.map((tutor, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{tutor.firstname}</td>
                                    <td>{tutor.lastname}</td>
                                    <td>{tutor.email}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </Table>

        </div>
    )
}

export default TutorList
