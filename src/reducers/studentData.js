import {
    SET_TOTAL_COURSES,
    CLEAR_TOTAL_COURSES,
    SET_COURSES_DETAILS,
    CLEAR_COURSES_DETAILS,
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
} from "../actions/types";

const initialState = {
    totalCourses: null,
    totalRegisteredCourses: null,
    coursesDetails: null,
    myCourseList: null,
    totalExams: null,
    examsDetails: null,
    courseRegisterStatusCode: null,
    pdfData: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TOTAL_COURSES:
            return {
                ...state,
                totalCourses: payload,
            };
        case CLEAR_TOTAL_COURSES:
            return {
                ...state,
                totalCourses: null,
            };
        case SET_COURSES_DETAILS:
            return {
                ...state,
                coursesDetails: payload,
            };
        case CLEAR_COURSES_DETAILS:
            return {
                ...state,
                coursesDetails: null,
            };
        case SET_TOTAL_REGISTERED_COURSES:
            return {
                ...state,
                totalRegisteredCourses: payload,
            };
        case CLEAR_TOTAL_REGISTERED_COURSES:
            return {
                ...state,
                totalRegisteredCourses: null,
            };
        case SET_MY_COURSES_LIST:
            return {
                ...state,
                myCourseList: payload,
            };
        case CLEAR_MY_COURSES_LIST:
            return {
                ...state,
                myCourseList: null,
            };
        case SET_TOTAL_EXAMS:
            return {
                ...state,
                totalExams: payload,
            };
        case CLEAR_TOTAL_EXAMS:
            return {
                ...state,
                totalExams: null,
            };
        case SET_EXAMS_DETAILS:
            return {
                ...state,
                examsDetails: payload,
            };
        case CLEAR_EXAMS_DETAILS:
            return {
                ...state,
                examsDetails: null,
            };
        case COURSE_REGISTER_STATUS_CODE:
            return {
                ...state,
                courseRegisterStatusCode: payload,
            };
        case RESET_COURSE_REGISTER_STATUS_CODE:
            return {
                ...state,
                courseRegisterStatusCode: null,
            };
        case DOWNLOAD_PDF:
            return {
                ...state,
                pdfData: payload,
            };
        case CLEAR_DOWNLOAD_PDF:
            return {
                ...state,
                pdfData: null,
            };
        default:
            return state;
    }
}