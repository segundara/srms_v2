import React from "react";
import axios from "axios";
import Cookies from "js-cookie"
import authAxios from "../lib/http"
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
    state = {
        userTitle: null,
        isLoggedin: true
    }

    redirectToWelcome = () => {
        this.props.status(!this.state.isLoggedin)
        this.props.userTitle(this.state.userTitle)
        this.props.history.push('/');
    }


    logout = async () => {
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
                console.log(response)
                this.redirectToWelcome();
            }

        } catch (error) {
            console.log(error)
        }

    }

    componentDidMount = () => {
        this.logout()
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(Logout)