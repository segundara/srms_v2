import axios from "axios";
import authAxios from "../../src/lib/http"
import Cookies from "js-cookie"
// import { useDispatch, useSelector } from "react-redux";
// import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/test/";

// const { user } = useSelector(state => state.auth);

const getMe = (userTitle) => {
    // try {
    return authAxios.get(`/${userTitle}/me`, { withCredentials: true })
        // let currentUser = []
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });


    // console.log(currentUser)
    // return currentUser;
    // setCurrentUser(currentUser)
    // setLoading(false)

    // } catch (error) {
    //     console.log(error)
    // }

};

const updateProfileText = (userTitle, data) => {
    // try {
    return authAxios.put(`/${userTitle}/me`, data, { withCredentials: true })
        // let currentUser = []
        .then((response) => {
            if (!response) {
                return axios.put(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });

};

const updateProfileImage = (userTitle, data) => {
    // try {
    return authAxios.post(`/${userTitle}/upload/me`, data, { withCredentials: true })
        // let currentUser = []
        .then((response) => {
            if (!response) {
                return axios.post(`${process.env.REACT_APP_API_URL}/${userTitle}/upload/me`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });

};

export default {
    getMe,
    updateProfileText,
    updateProfileImage
};