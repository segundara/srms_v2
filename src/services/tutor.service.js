import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"

const getTutorCourses = (userID) => {
    return authAxios.get(`/courses/${userID}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/courses/${userID}`, {
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

const getTotalStudentsByCourse = async (userID) => {
    const courses = await getTutorCourses(userID);
    let totalStudent = [];
    if (courses) {
        for (const course of courses) {
            let student = [];

            const res = await authAxios.get(
                `/register/student_list/${course._id}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            totalStudent.push(student.count);
        }
    }
    console.log(totalStudent);
    return totalStudent;
};

const getMyStudentsList = async (currentPage, perPage, userID) => {
    const courses = await getTutorCourses(userID);
    let allStudents = [];
    if (courses) {
        for (const course of courses) {
            let student = [];
            let eachList = {};

            const skip = currentPage * perPage - perPage;
            const res = await authAxios.get(
                `/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            eachList.name = course.name;
            eachList.students = student.data;
            console.log(student);
            allStudents.push(eachList);
        }
    }
    console.log(allStudents);
    return allStudents;
};

const getExamsRecords = async (currentPage, perPage, userID) => {
    let allStudents = [];
    const courses = await getTutorCourses(userID);
    if (courses) {
        for (const course of courses) {
            let student = [];
            let eachRecord = {};
            const skip = currentPage * perPage - perPage;
            const res = await authAxios.get(
                `/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            eachRecord.name = course.name;
            eachRecord.students = student.data;
            allStudents.push(eachRecord);
        }
    }
    return allStudents;
};

const getTotalStudentsByExam = async (userID) => {
    const courses = await getTutorCourses(userID);
    let totalStudent = [];
    if (courses) {
        for (const course of courses) {
            let student = [];

            const res = await authAxios.get(
                `/exams/student_list/${course._id}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            totalStudent.push(student.count);
        }
    }
    return totalStudent;
};

const getEmailService = (data) => {
    const url_1 = `/tutor/email/ToStudent`;
    const url_2 = `${process.env.REACT_APP_API_URL}/tutor/email/ToStudent`;
    return authAxios.post(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.post(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response;
                    });
            }
            return response;
        });
};

const getGradingService = (data, studentId, examId) => {
    const url_1 = `/exams/${studentId}/${examId}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${studentId}/${examId}`;
    return authAxios.put(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.put(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response;
                    });
            }
            return response;
        });
};

export default {
    getTutorCourses,
    getTotalStudentsByCourse,
    getMyStudentsList,
    getExamsRecords,
    getTotalStudentsByExam,
    getEmailService,
    getGradingService
};