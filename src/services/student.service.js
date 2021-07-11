import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"
// import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/test/";

const getTotalCourses = () => {
    return authAxios.get(`/courses`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getCoursesDetails = (currentPage, perPage) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/courses?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response.data.data;
                    });
            }
            console.log(response);
            return response.data.data;
        });
};

const getTotalRegisteredCourses = (userID) => {
    const url_1 = `/register/course_list/${userID}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getMyCourseList = (currentPage, perPage, userID) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response.data.data;
                    });
            }
            console.log(response);
            return response.data.data;
        });
};

const getTotalExams = (userID) => {
    const url_1 = `/exams/${userID}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getExamsDetails = (currentPage, perPage, userID) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/exams/${userID}?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response.data.data;
                    });
            }
            console.log(response);
            return response.data.data;
        });
};

const registerForCourse = (data) => {
    const url_1 = `/register`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register`;
    return authAxios.post(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.post(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        console.log(response);
                        return response;
                    });
            }
            console.log(response);
            return response;
        });
};

// const downloadPDF = (userID) => {
//     const url_1 = `/exams/${userID}/pdf`;
//     const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`;
//     return authAxios.get(`${url_1}`, {
//         responseType: "blob",
//         withCredentials: true,
//     })
//         .then((response) => {
//             if (!response) {
//                 return axios.get(`${url_2}`, {
//                     headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//                     responseType: "blob",
//                     withCredentials: true,
//                 })

//                     .then((response) => {
//                         return response;
//                     });
//             }
//             return response;
//         });
// };

const downloadPDF = async (userID) => {
    // try {
    const res = await authAxios.get(`/exams/${userID}/pdf`, {
        responseType: "blob",
        withCredentials: true,
    });
    let result = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                responseType: "blob",
                withCredentials: true,
            }
        );
        result = await secondRes;
        return result;
    } else {
        result = await res;
        return result;
    }
    // const content = result.headers["content-type"];
    // download(result.data, "Transcript", content);

    // successStatus(true);
    // setTimeout(() => {
    //     successStatus(false);
    // }, 5000);
    // } catch (error) {
    //     console.log(error);
    //     failureStatus(true);
    //     setTimeout(() => {
    //         failureStatus(false);
    //     }, 5000);
    // }
};

export default {
    getTotalCourses,
    getCoursesDetails,
    getTotalRegisteredCourses,
    getMyCourseList,
    getTotalExams,
    getExamsDetails,
    registerForCourse,
    downloadPDF
};