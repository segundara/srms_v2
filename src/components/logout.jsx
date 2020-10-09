import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import authAxios from "../lib/http"
import { withRouter } from 'react-router-dom';

const Logout = (props) => {
    const [userTitle, setUserTitle] = useState(null)
    const [isLoggedin, setIsLoggedin] = useState(true)

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await authAxios.post(`/users/logout`, {}, { withCredentials: true })
                let response = []

                if (!res) {
                    const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    response = await secondRes
                }
                else {
                    response = await res
                }

                if (response.status === 200) {
                    // console.log(response)
                    props.status(!isLoggedin)
                    props.userTitle(userTitle)
                    props.history.push('/');
                }

            } catch (error) {
                console.log(error)
            }

        }
        logout()
    }, [])

    return (
        <div></div>
    );
}

export default withRouter(Logout)