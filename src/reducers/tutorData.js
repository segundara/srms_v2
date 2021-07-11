import {
    SET_TOTAL_STUDENTS_BY_COURSE,
    CLEAR_TOTAL_STUDENTS_BY_COURSE,
    SET_MY_STUDENTS_LIST,
    CLEAR_MY_STUDENTS_LIST,
    SET_EXAMS_RECORDS,
    CLEAR_EXAMS_RECORDS,
    SET_TOTAL_STUDENTS_BY_EXAM,
    CLEAR_TOTAL_STUDENTS_BY_EXAM,
    SET_EMAIL_SERVICE,
    CLEAR_EMAIL_SERVICE,
    SET_GRADING_SERVICE,
    CLEAR_GRADING_SERVICE
} from "../actions/types";

const initialState = {
    totalStudentsByCourse: null,
    myStudentsList: null,
    examsRecords: null,
    totalStudentsByExam: null,
    emailService: null,
    gradingService: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TOTAL_STUDENTS_BY_COURSE:
            return {
                ...state,
                totalStudentsByCourse: payload,
            };
        case CLEAR_TOTAL_STUDENTS_BY_COURSE:
            return {
                ...state,
                totalStudentsByCourse: null,
            };
        case SET_MY_STUDENTS_LIST:
            return {
                ...state,
                myStudentsList: payload,
            };
        case CLEAR_MY_STUDENTS_LIST:
            return {
                ...state,
                myStudentsList: null,
            };
        case SET_EXAMS_RECORDS:
            return {
                ...state,
                examsRecords: payload,
            };
        case CLEAR_EXAMS_RECORDS:
            return {
                ...state,
                examsRecords: null,
            };
        case SET_TOTAL_STUDENTS_BY_EXAM:
            return {
                ...state,
                totalStudentsByExam: payload,
            };
        case CLEAR_TOTAL_STUDENTS_BY_EXAM:
            return {
                ...state,
                totalStudentsByExam: null,
            };
        case SET_EMAIL_SERVICE:
            return {
                ...state,
                emailService: payload,
            };
        case CLEAR_EMAIL_SERVICE:
            return {
                ...state,
                emailService: null,
            };
        case SET_GRADING_SERVICE:
            return {
                ...state,
                gradingService: payload,
            };
        case CLEAR_GRADING_SERVICE:
            return {
                ...state,
                gradingService: null,
            };
        // case DOWNLOAD_PDF:
        //     return {
        //         ...state,
        //         pdfData: payload,
        //     };
        // case CLEAR_DOWNLOAD_PDF:
        //     return {
        //         ...state,
        //         pdfData: null,
        //     };
        default:
            return state;
    }
}