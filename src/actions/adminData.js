import {
    SET_DEPARTMENTS_DETAILS,
    SET_STUDENTS_DETAILS,
    SET_TOTAL_STUDENTS,
    SET_TOTAL_TUTORS,
    SET_TUTORS_DETAILS,
    SET_MESSAGE,
    CLEAR_TOTAL_STUDENTS,
    CLEAR_STUDENTS_DETAILS,
    CLEAR_DEPARTMENTS_DETAILS,
    SET_NEW_COURSE,
    CLEAR_NEW_COURSE,
    SET_NEW_STUDENT,
    CLEAR_NEW_STUDENT,
    SET_NEW_TUTOR,
    CLEAR_NEW_TUTOR,
    CLEAR_TOTAL_TUTORS,
    CLEAR_TUTORS_DETAILS,
    SET_TOTAL_COURSES,
    CLEAR_TOTAL_COURSES,
    SET_COURSES_DETAILS,
    CLEAR_COURSES_DETAILS,
    SET_TUTORS,
    CLEAR_TUTORS
} from "./types";

import DataService from "../services/admin.service";

export const setTotalStudents = () => (dispatch) => {
    return DataService.getTotalStudents().then(
        (data) => {
            dispatch({
                type: SET_TOTAL_STUDENTS,
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

export const clearTotalStudents = () => ({
    type: CLEAR_TOTAL_STUDENTS,
});

export const setStudentsDetails = (currentPage, perPage) => (dispatch) => {
    return DataService.getStudentsDetails(currentPage, perPage).then(
        (data) => {
            dispatch({
                type: SET_STUDENTS_DETAILS,
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

export const clearStudentsDetails = () => ({
    type: CLEAR_STUDENTS_DETAILS,
});

export const setDepartmentsDetails = () => (dispatch) => {
    return DataService.getDepartmentsDetails().then(
        (data) => {
            dispatch({
                type: SET_DEPARTMENTS_DETAILS,
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

export const clearDepartmentsDetails = () => ({
    type: CLEAR_DEPARTMENTS_DETAILS,
});

export const setNewStudent = (data) => (dispatch) => {
    return DataService.getNewStudent(data).then(
        (data) => {
            dispatch({
                type: SET_NEW_STUDENT,
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

export const clearNewStudent = () => ({
    type: CLEAR_NEW_STUDENT,
});

export const setTotalTutors = () => (dispatch) => {
    return DataService.getTotalTutors().then(
        (data) => {
            dispatch({
                type: SET_TOTAL_TUTORS,
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

export const clearTotalTutors = () => ({
    type: CLEAR_TOTAL_TUTORS,
});

export const setTutorsDetails = (currentPage, perPage) => (dispatch) => {
    return DataService.getTutorsDetails(currentPage, perPage).then(
        (data) => {
            dispatch({
                type: SET_TUTORS_DETAILS,
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

export const clearTutorsDetails = () => ({
    type: CLEAR_TUTORS_DETAILS,
});

export const setNewTutor = (data) => (dispatch) => {
    return DataService.getNewTutor(data).then(
        (data) => {
            dispatch({
                type: SET_NEW_TUTOR,
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

export const clearNewTutor = () => ({
    type: CLEAR_NEW_TUTOR,
});

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

export const setNewCourse = (data) => (dispatch) => {
    return DataService.getNewCourse(data).then(
        (data) => {
            dispatch({
                type: SET_NEW_COURSE,
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

export const clearNewCourse = () => ({
    type: CLEAR_NEW_COURSE,
});

export const setTutors = () => (dispatch) => {
    return DataService.getTutors().then(
        (data) => {
            dispatch({
                type: SET_TUTORS,
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

export const clearTutors = () => ({
    type: CLEAR_TUTORS,
});