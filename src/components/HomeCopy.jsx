import React from "react"
import authAxios from "../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Container, Row, Col, Card, Image } from "react-bootstrap"
import StudentDetail from './student/Student'
import TutorDetail from './tutor/Tutor'
import AdminDetail from './admin/Admin'

class Home extends React.Component {
    state = { currentUser: null }

    componentDidMount = async () => {
        try {
            const res = await authAxios.get(`/${this.props.userTitle}/me`, { withCredentials: true })
            let currentUser = []

            if (!res) {
                const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/${this.props.userTitle}/me`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })
                currentUser = secondRes.data
            } else {
                currentUser = res.data
            }

            this.setState({
                currentUser
            })
        } catch (error) {
            console.log(error)
        }
    }

    showMe = () => {
        return (
            <>
                {this.state.currentUser
                    ? (
                        <>
                            <Row>
                                <Col>
                                    <Row className="mt-4 mb-2">
                                        <Col md={3}>
                                            {this.state.currentUser.image
                                                ? <Image src={this.state.currentUser.image} className="img-fluid" alt="profile" />
                                                : <Image src='https://img.icons8.com/officel/2x/user.png' className="img-fluid" alt="profile" />
                                            }
                                        </Col>
                                        <Col md={9} className="d-flex flex-column justify-content-center">
                                            <h3>{this.state.currentUser.firstname} {this.state.currentUser.lastname}</h3>
                                            <strong>{this.state.currentUser.email}</strong>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    )
                    : null}
                {this.props.userTitle === "student"
                    ? (<StudentDetail user={this.state.currentUser} userTitle={this.props.userTitle} />)
                    : (this.props.userTitle === "tutor" ? (<TutorDetail user={this.state.currentUser} />)
                        : (<AdminDetail user={this.state.currentUser} />))
                }

            </>
        )
    }

    render() {
        console.log(this.state.currentUser)
        return (
            <>
                <Container className="mt-3">
                    <>
                        <h1>{this.props.userTitle.toUpperCase()} DASHBOARD</h1>
                        {
                            this.showMe()
                        }
                    </>
                </Container>
            </>
        )
    }

}

export default Home


////////////////////////////////////////////////////////
{
    userTitle === "student"
    ? (<StudentDetail userTitle={userTitle} />)
    : (userTitle === "tutor" ? (<TutorDetail userTitle={userTitle} />)
        : (<AdminDetail userTitle={userTitle} />))
}

[firstname, lastname, email, dateofbirth, nationality, image]