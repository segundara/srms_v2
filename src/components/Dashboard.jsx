import React from "react"
import { Container } from "react-bootstrap"
import StudentDetail from './student/Student'
import TutorDetail from './tutor/Tutor'
import AdminDetail from './admin/Admin'
import JumBotron from "./welcome/Welcome"
import { withRouter } from 'react-router-dom';

const Dashboard = ({ userTitle, userInfo }, props) => {

    console.log("userTitle => ", userTitle)
    console.log("userInfo => ", userInfo)

    return (
        <>
            <Container className="mt-3">
                {userTitle.length === 0 && (props.history.push('/'))}
                {userTitle.length > 0
                    ? (
                        <>
                            <h1>{userTitle.toUpperCase()} DASHBOARD</h1>
                            {userTitle === "student"
                                ? (<StudentDetail userTitle={userTitle} userInfo={userInfo} />)
                                : (userTitle === "tutor" ? (<TutorDetail userTitle={userTitle} userInfo={userInfo} />)
                                    : (<AdminDetail userTitle={userTitle} userInfo={userInfo} />)
                                )
                            }

                        )
                        </>

                    ) : null}
            </Container>
        </>
    )

}

export default withRouter(Dashboard)
