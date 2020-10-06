import React from "react"
import { Container } from "react-bootstrap"
import StudentDetail from './student/Student'
import TutorDetail from './tutor/Tutor'
import AdminDetail from './admin/Admin'

const Dashboard = ({ userTitle }) => {

    return (
        <>
            <Container className="mt-3">
                {userTitle
                    ? (
                        <>
                            <h1>{userTitle.toUpperCase()} DASHBOARD</h1>
                            {userTitle === "student"
                                ? (<StudentDetail userTitle={userTitle} />)
                                : (userTitle === "tutor" ? (<TutorDetail userTitle={userTitle} />)
                                    : (<AdminDetail userTitle={userTitle} />))
                            }
                        </>

                    ) : null}
            </Container>
        </>
    )

}

export default Dashboard
