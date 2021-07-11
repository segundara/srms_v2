import axios from "axios";
import authAxios from "../../src/lib/http"
import Cookies from "js-cookie"

// const API_URL = "http://localhost:8080/api/auth/";

const login = (email, password) => {
    return axios
        .post(`${process.env.REACT_APP_API_URL}/users/login`, {
            email,
            password,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("userTitle", JSON.stringify(response.data));
            }

            return response.data;
        });
};

// const login = (email, password) => {
//     return axios
//         .post(API_URL + "signin", {
//             email,
//             password,
//         })
//         .then((response) => {
//             if (response.data.accessToken) {
//                 localStorage.setItem("user", JSON.stringify(response.data));
//             }

//             return response.data;
//         });
// };

const logout = () => {
    const res = authAxios.post(`/users/logout`, {}, { withCredentials: true })
    let response = []

    if (!res) {
        const secondRes = axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
        })
        response = secondRes
    }
    else {
        response = res
    }
    if (response.status === 200) {
        // localStorage.removeItem("user");
        localStorage.clear();
    }
    // localStorage.removeItem("user");
};

export default {
    login,
    logout,
};