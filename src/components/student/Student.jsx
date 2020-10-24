import React, { useContext } from 'react';
import { Accordion, Button, Table, Row, Col, Card, Image } from 'react-bootstrap'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import PropTypes from 'prop-types';
import StudentProfile from './Profile';
import AllCourses from './Courses';
import MyCourses from './Registered';
import ExamsGrades from './ExamsGrades';
import "../allrouteStyle/style.scss";
import { format } from 'date-fns'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const StudentDetail = ({ userTitle, currentUser, updateUserInfo, updateData, userData }) => {

    const updateUser = (newInfo) => { updateUserInfo(newInfo) }
    const getData = (newData) => { updateData(newData) }

    function CustomToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );

        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <div onClick={decoratedOnClick} style={{ backgroundColor: '#6c63ff', cursor: 'pointer' }}>
                {children}
                <FontAwesomeIcon
                    icon={isCurrentEventKey ? faAngleDown : faAngleLeft}
                />
            </div>
        );
    }
    //     function CustomToggle({ children }) {
    //   const currentEventKey = useContext(AccordionContext);
    //   const accordionIsExpanded = currentEventKey > 0;
    //   // console.debug('currentEventKey', currentEventKey);
    //   return (
    //     <div>
    //       {children}
    //       <FontAwesomeIcon
    //         icon={accordionIsExpanded ? 'angle-down' : 'angle-right'}
    //       />
    //       <ClickForMore> (click for more...)</ClickForMore>
    //     </div>
    //   );
    // }

    // CustomToggle.propTypes = {
    //   children: PropTypes.object,
    // };

    return (
        <>
            {currentUser && (
                <>
                    {/* {console.log(currentUser.dateofbirth)}
                    <Row>
                        <Col> */}
                    <Row className="mt-4 mb-2">
                        <Col md={3} className="text-center mb-3">
                            {currentUser && currentUser.image
                                ? <Image src={currentUser.image} className="img-fluid rounded-circle" alt="profile" />
                                : <Image src='https://img.icons8.com/officel/2x/user.png' className="img-fluid rounded-circle" alt="profile" />
                            }
                            <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                            <strong>{currentUser.email}</strong>
                        </Col>
                        <Col md={9} className="d-flex flex-column justify-content-center">
                            <Accordion defaultActiveKey="1">
                                <Card className="card mb-4">
                                    <CustomToggle as={Card.Header} eventKey="0" >
                                        My Account
                                    </CustomToggle>
                                    {/* <Accordion.Toggle as={Card.Header} eventKey="0" className="accordion-nav">
                                        My Account
                                    </Accordion.Toggle> */}
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <>
                                                <Table responsive="sm">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-left" colSpan="2">Profile Detail</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>First Name</td>
                                                            <td><strong>{currentUser.firstname}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Name</td>
                                                            <td><strong>{currentUser.lastname}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Email</td>
                                                            <td><strong>{currentUser.email}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>D.O.B</td>
                                                            <td><strong>{format(new Date(currentUser.dateofbirth), 'yyyy-MM-dd')}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nationality</td>
                                                            <td><strong>{currentUser.nationality}</strong></td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <StudentProfile
                                                    currentUser={currentUser}
                                                    updateUser={updateUser}
                                                    userTitle={userTitle}
                                                />
                                            </>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card className="card mb-4">
                                    <Accordion.Toggle as={Card.Header} eventKey="1" className="accordion-nav">
                                        Available Courses
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <AllCourses
                                                userID={currentUser._id}
                                                updateData={getData}
                                            />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card className="card mb-4">
                                    <Accordion.Toggle as={Card.Header} eventKey="2" className="accordion-nav">
                                        My Course List
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <MyCourses
                                                userID={currentUser._id}
                                                updateData={userData}
                                            />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card className="card mb-4">
                                    <Accordion.Toggle as={Card.Header} eventKey="3" className="accordion-nav">
                                        My Exams/Grades
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            <ExamsGrades
                                                userID={currentUser._id}
                                                updateData={userData}
                                            />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                    {/* </Col>
                    </Row> */}
                </>
            )}
        </>
    )
}

export default StudentDetail