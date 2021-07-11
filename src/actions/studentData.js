import {
    SET_TOTAL_COURSES,
    CLEAR_TOTAL_COURSES,
    SET_COURSES_DETAILS,
    CLEAR_COURSES_DETAILS,
    SET_MESSAGE,
    SET_TOTAL_REGISTERED_COURSES,
    CLEAR_TOTAL_REGISTERED_COURSES,
    SET_MY_COURSES_LIST,
    CLEAR_MY_COURSES_LIST,
    SET_TOTAL_EXAMS,
    CLEAR_TOTAL_EXAMS,
    SET_EXAMS_DETAILS,
    CLEAR_EXAMS_DETAILS,
    COURSE_REGISTER_STATUS_CODE,
    RESET_COURSE_REGISTER_STATUS_CODE,
    DOWNLOAD_PDF,
    CLEAR_DOWNLOAD_PDF
} from "./types";

import DataService from "../services/student.service";

export const setTotalCourses = () => (dispatch) => {
    return DataService.getTotalCourses().then(
        (data) => {
            dispatch({
                type: SET_TOTAL_COURSES,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearTotalCourses = () => ({
    type: CLEAR_TOTAL_COURSES,
});

export const setCoursesDetails = (currentPage, perPage) => (dispatch) => {
    return DataService.getCoursesDetails(currentPage, perPage).then(
        (data) => {
            dispatch({
                type: SET_COURSES_DETAILS,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearCoursesDetails = () => ({
    type: CLEAR_COURSES_DETAILS,
});

export const setTotalRegisteredCourses = (userID) => (dispatch) => {
    return DataService.getTotalRegisteredCourses(userID).then(
        (data) => {
            dispatch({
                type: SET_TOTAL_REGISTERED_COURSES,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearTotalRegisteredCourses = () => ({
    type: CLEAR_TOTAL_REGISTERED_COURSES,
});

export const setMyCourseList = (currentPage, perPage, userID) => (dispatch) => {
    return DataService.getMyCourseList(currentPage, perPage, userID).then(
        (data) => {
            dispatch({
                type: SET_MY_COURSES_LIST,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearMyCourseList = () => ({
    type: CLEAR_MY_COURSES_LIST,
});

export const setTotalExams = (userID) => (dispatch) => {
    return DataService.getTotalExams(userID).then(
        (data) => {
            dispatch({
                type: SET_TOTAL_EXAMS,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearTotalExams = () => ({
    type: CLEAR_TOTAL_EXAMS,
});

export const setExamsDetails = (currentPage, perPage, userID) => (dispatch) => {
    return DataService.getExamsDetails(currentPage, perPage, userID).then(
        (data) => {
            dispatch({
                type: SET_EXAMS_DETAILS,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearExamsDetails = () => ({
    type: CLEAR_EXAMS_DETAILS,
});

export const resgisterForCourse = (courseInfo) => (dispatch) => {
    return DataService.registerForCourse(courseInfo).then(
        (data) => {
            dispatch({
                type: COURSE_REGISTER_STATUS_CODE,
                payload: data.status,
            });
            console.log(data.status)

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: error.response.data,
            });
            dispatch({
                type: COURSE_REGISTER_STATUS_CODE,
                payload: error.response.status,
            });

            return Promise.reject();
        }
    );
};

export const resetResgisterForCourse = () => ({
    type: RESET_COURSE_REGISTER_STATUS_CODE,
});

export const downloadPDF = (userID) => (dispatch) => {
    return DataService.downloadPDF(userID).then(
        (data) => {
            dispatch({
                type: DOWNLOAD_PDF,
                payload: data,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const clearDownloadPDF = () => ({
    type: CLEAR_DOWNLOAD_PDF,
});