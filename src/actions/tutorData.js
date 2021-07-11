import {
    SET_TOTAL_STUDENTS_BY_COURSE,
    CLEAR_TOTAL_STUDENTS_BY_COURSE,
    SET_MESSAGE,
    SET_MY_STUDENTS_LIST,
    CLEAR_MY_STUDENTS_LIST,
    SET_EXAMS_RECORDS,
    CLEAR_EXAMS_RECORDS,
    SET_TOTAL_STUDENTS_BY_EXAM,
    CLEAR_TOTAL_STUDENTS_BY_EXAM,
    SET_GRADING_SERVICE,
    CLEAR_GRADING_SERVICE,
    SET_EMAIL_SERVICE,
    CLEAR_EMAIL_SERVICE
} from "./types";

import DataService from "../services/tutor.service";

export const setTotalStudentsByCourse = (userID) => (dispatch) => {
    return DataService.getTotalStudentsByCourse(userID).then(
        (data) => {
            dispatch({
                type: SET_TOTAL_STUDENTS_BY_COURSE,
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

export const clearTotalStudentsByCourse = () => ({
    type: CLEAR_TOTAL_STUDENTS_BY_COURSE,
});

export const setMyStudentsList = (currentPage, perPage, userID) => (dispatch) => {
    return DataService.getMyStudentsList(currentPage, perPage, userID).then(
        (data) => {
            dispatch({
                type: SET_MY_STUDENTS_LIST,
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

export const clearMyStudentsList = () => ({
    type: CLEAR_MY_STUDENTS_LIST,
});

export const setExamsRecords = (currentPage, perPage, userID) => (dispatch) => {
    return DataService.getExamsRecords(currentPage, perPage, userID).then(
        (data) => {
            dispatch({
                type: SET_EXAMS_RECORDS,
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

export const clearExamsRecords = () => ({
    type: CLEAR_EXAMS_RECORDS,
});

export const setTotalStudentsByExam = (userID) => (dispatch) => {
    return DataService.getTotalStudentsByExam(userID).then(
        (data) => {
            dispatch({
                type: SET_TOTAL_STUDENTS_BY_EXAM,
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

export const clearTotalStudentsByExam = () => ({
    type: CLEAR_TOTAL_STUDENTS_BY_EXAM,
});

export const setEmailService = (data) => (dispatch) => {
    return DataService.getEmailService(data).then(
        (data) => {
            dispatch({
                type: SET_EMAIL_SERVICE,
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

export const clearEmailService = () => ({
    type: CLEAR_EMAIL_SERVICE,
});

export const setGradingService = (data, studentId, examId) => (dispatch) => {
    return DataService.getGradingService(data, studentId, examId).then(
        (data) => {
            dispatch({
                type: SET_GRADING_SERVICE,
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

export const clearGradingService = () => ({
    type: CLEAR_GRADING_SERVICE,
});