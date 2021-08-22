import React, { useState, useEffect } from 'react';
import "../commonStyle/style.scss";
import StudentDetail from '../student/Student';
import TutorDetail from '../tutor/Tutor';
import AdminDetail from '../admin/Admin';

import { useDispatch, useSelector } from "react-redux";

import { fetchMe } from "../../actions/fetch_Me";

const UserData = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    const { user } = useSelector(state => state.auth);
    const { info } = useSelector(state => state.me);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            dispatch(fetchMe(user))
            setCurrentUser(info)
        }

    }, [dispatch, info, user, currentUser]);

    return (
        <>
            {currentUser && (
                user === "student"
                    ? (
                        <StudentDetail />
                    )
                    : (user === "tutor"
                        ? (<TutorDetail />
                        )
                        : (<AdminDetail />)
                    )
            )}
        </>
    )
}
export default UserData