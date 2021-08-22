import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";

import { resgisterForCourse } from "../../actions/studentData";

const RegisterCourse = async (courseid, examdate, userID, dataUpdate, successStatus, failureStatus) => {

    const dispatch = useDispatch();

    const data = {
        studentid: userID,
        courseid: courseid,
        reg_date: format(new Date(), "yyyy-MM-dd"),
        examdate: examdate,
    };

    dispatch(resgisterForCourse(data));

    successStatus(true);
    setTimeout(() => {
        successStatus(false);
    }, 5000);

};

export default RegisterCourse;