import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"

const getTotalStudents = async () => {
    const res = await authAxios.get(`/student`, { withCredentials: true });
    let students = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/student`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        students = secondRes.data;
    } else {
        students = res.data;
    }
    return students.count
};

const getStudentsDetails = async (currentPage, perPage) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/student?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allStudents = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/student?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allStudents = secondRes.data;
    } else {
        allStudents = res.data;
    }
    return allStudents.data;
};

const getDepartmentsDetails = async () => {
    const response = await authAxios.get(`/departments`, {
        withCredentials: true,
    });
    let allDepartments = [];

    if (!response) {
        const secondResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/departments`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allDepartments = secondResponse.data;
    } else {
        allDepartments = response.data;
    }
    return allDepartments.data;
};

const getNewStudent = async (data) => {
    const res = await authAxios.post(`/student/register`, data, {
        withCredentials: true,
    });
    let response = [];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/student/register`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        response = await secondRes;
    } else {
        response = await res;
    }
    console.log(response)
    return response
};

const getTotalTutors = async () => {
    const res = await authAxios.get(`/tutor`, { withCredentials: true });
    let tutors = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        tutors = secondRes.data;
    } else {
        tutors = res.data;
    }
    return tutors.count
};

const getTutorsDetails = async (currentPage, perPage) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/tutor?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allTutors = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allTutors = secondRes.data;
    } else {
        allTutors = res.data;
    }
    return allTutors.data;
};

const getNewTutor = async (data) => {
    const res = await authAxios.post(`/tutor/register`, data, {
        withCredentials: true,
    });
    let response = [];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/tutor/register`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        response = await secondRes;
    } else {
        response = await res;
    }
    console.log(response)
    return response
};

const getTotalCourses = async () => {
    const res = await authAxios.get(`/courses`, { withCredentials: true });
    let courses = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/courses`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        courses = secondRes.data;
    } else {
        courses = res.data;
    }
    console.log(courses.count)
    return courses.count
};

const getCoursesDetails = async (currentPage, perPage) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/courses?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allCourses = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allCourses = secondRes.data;
    } else {
        allCourses = res.data;
    }
    return allCourses.data;
};

const getNewCourse = async (data) => {
    const res = await authAxios.post(`/courses`, data, {
        withCredentials: true,
    });
    let response = [];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/courses`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        response = await secondRes;
    } else {
        response = await res;
    }
    console.log(response)
    return response
};

const getTutors = async () => {
    const response = await authAxios.get(`/tutor`, { withCredentials: true });
    let allTutors = [];

    if (!response) {
        const secondResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allTutors = secondResponse.data;
    } else {
        allTutors = response.data;
    }

    console.log(allTutors.data)
    return allTutors.data
};

export default {
    getTotalStudents,
    getStudentsDetails,
    getDepartmentsDetails,
    getNewStudent,
    getTotalTutors,
    getTutorsDetails,
    getNewTutor,
    getTotalCourses,
    getCoursesDetails,
    getNewCourse,
    getTutors
};