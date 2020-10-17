import React from "react"
import { Container } from "react-bootstrap"
import StudentDetail from './student/Student'
import TutorDetail from './tutor/Tutor'
import AdminDetail from './admin/Admin'
import JumBotron from "./welcome/Welcome"

const Dashboard = ({ userTitle, userInfo }) => {

    console.log("userTitle => ", userTitle)
    console.log("userInfo => ", userInfo)

    return (
        <>
            <Container className="mt-3">
                {userTitle
                    ? (
                        <>
                            <h1>{userTitle.toUpperCase()} DASHBOARD</h1>
                            {userTitle === "student"
                                ? (<StudentDetail userTitle={userTitle} userInfo={userInfo} />)
                                : (userTitle === "tutor" ? (<TutorDetail userTitle={userTitle} userInfo={userInfo} />)
                                    : (userTitle === "admin" ? (<AdminDetail userTitle={userTitle} userInfo={userInfo} />)
                                        : (<JumBotron />)))
                            }
                        </>

                    ) : null}
            </Container>
        </>
    )

}

export default Dashboard
