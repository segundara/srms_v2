import {
    SET_DEPARTMENTS_DETAILS,
    CLEAR_DEPARTMENTS_DETAILS,
    SET_STUDENTS_DETAILS,
    CLEAR_STUDENTS_DETAILS,
    SET_TOTAL_STUDENTS,
    CLEAR_TOTAL_STUDENTS,
    SET_TOTAL_TUTORS,
    CLEAR_TOTAL_TUTORS,
    SET_TUTORS_DETAILS,
    CLEAR_TUTORS_DETAILS,
    SET_NEW_STUDENT,
    CLEAR_NEW_STUDENT,
    SET_NEW_TUTOR,
    CLEAR_NEW_TUTOR,
    SET_NEW_COURSE,
    CLEAR_NEW_COURSE,
    SET_TOTAL_COURSES,
    CLEAR_TOTAL_COURSES,
    SET_COURSES_DETAILS,
    CLEAR_COURSES_DETAILS,
    SET_TUTORS,
    CLEAR_TUTORS
} from "../actions/types";

const initialState = {
    departmentsDetails: null,
    studentsDetails: null,
    totalStudents: null,
    totalTutors: null,
    tutorsDetails: null,
    newStudent: null,
    newTutor: null,
    newCourse: null,
    coursesDetails: null,
    totalCourses: null,
    tutors: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TOTAL_STUDENTS:
            return {
                ...state,
                totalStudents: payload,
            };
        case CLEAR_TOTAL_STUDENTS:
            return {
                ...state,
                totalStudents: null,
            };
        case SET_TOTAL_TUTORS:
            return {
                ...state,
                totalTutors: payload,
            };
        case CLEAR_TOTAL_TUTORS:
            return {
                ...state,
                totalTutors: null,
            };
        case SET_STUDENTS_DETAILS:
            return {
                ...state,
                studentsDetails: payload,
            };
        case CLEAR_STUDENTS_DETAILS:
            return {
                ...state,
                studentsDetails: null,
            };
        case SET_TUTORS_DETAILS:
            return {
                ...state,
                tutorsDetails: payload,
            };
        case CLEAR_TUTORS_DETAILS:
            return {
                ...state,
                tutorsDetails: null,
            };
        case SET_DEPARTMENTS_DETAILS:
            return {
                ...state,
                departmentsDetails: payload,
            };
        case CLEAR_DEPARTMENTS_DETAILS:
            return {
                ...state,
                departmentsDetails: null,
            };
        case SET_NEW_STUDENT:
            return {
                ...state,
                newStudent: payload,
            };
        case CLEAR_NEW_STUDENT:
            return {
                ...state,
                newStudent: null,
            };
        case SET_NEW_TUTOR:
            return {
                ...state,
                newTutor: payload,
            };
        case CLEAR_NEW_TUTOR:
            return {
                ...state,
                newTutor: null,
            };
        case SET_NEW_COURSE:
            return {
                ...state,
                newCourse: payload,
            };
        case CLEAR_NEW_COURSE:
            return {
                ...state,
                newCourse: null,
            };
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
        case SET_TUTORS:
            return {
                ...state,
                tutors: payload,
            };
        case CLEAR_TUTORS:
            return {
                ...state,
                tutors: null,
            };
        default:
            return state;
    }
}