import React from "react"
import { Container } from "react-bootstrap"
import StudentDetail from './student/Student'
import TutorDetail from './tutor/Tutor'
import AdminDetail from './admin/Admin'
import JumBotron from "./welcome/Welcome"
import "./allrouteStyle/style.scss"

const Dashboard = (props) => {

    console.log("userTitle => ", props.userTitle)
    console.log("userTitle => ", props)

    return (
        <>
            {props.userTitle.length > 0
                ? (
                    <>
                        <Container className="mt-3">
                            <h1>{props.userTitle.toUpperCase()} DASHBOARD</h1>
                            {props.userTitle === "student"
                                ? (<StudentDetail userTitle={props.userTitle} />)
                                : (props.userTitle === "tutor" ? (<TutorDetail userTitle={props.userTitle} />)
                                    : (<AdminDetail userTitle={props.userTitle} />)
                                )
                            }
                        </Container>
                    </>

                )
                : <JumBotron />
            }
        </>
    )

}

export default Dashboard
