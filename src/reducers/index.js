import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import me from "./me";
import student from "./studentData";
import tutor from "./tutorData";
import admin from "./adminData";

export default combineReducers({
    auth,
    message,
    me,
    student,
    tutor,
    admin
});