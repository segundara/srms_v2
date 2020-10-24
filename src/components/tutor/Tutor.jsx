import React, { useContext } from "react";
import {
  Accordion,
  Button,
  Table,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TutorProfile from "./Profile";
import StudentList from "./MyStudentList";
import ExamsGrades from "../tutor/ExamsGrades";
import "../allrouteStyle/style.scss";

const TutorDetail = ({ userTitle, currentUser, updateUserInfo }) => {
  const updateUser = (newInfo) => {
    updateUserInfo(newInfo);
  };

  function CustomToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <div
        onClick={decoratedOnClick}
        style={{
          backgroundColor: "#6c63ff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          fontSize: "large",
          fontWeight: "900",
          paddingLeft: "5px",
          paddingRight: "5px",
          fontFamily: "sans-serif",
        }}
      >
        {children}
        <FontAwesomeIcon
          style={{ height: "auto" }}
          icon={isCurrentEventKey ? faAngleDown : faAngleLeft}
        />
      </div>
    );
  }

  return (
    <>
      <Row className="mt-4 mb-2">
        <Col md={3} className="text-center mb-3">
          {currentUser && currentUser.image ? (
            <Image
              src={currentUser.image}
              className="img-fluid rounded-circle"
              alt="profile"
            />
          ) : (
            <Image
              src="https://img.icons8.com/officel/2x/user.png"
              className="img-fluid rounded-circle"
              alt="profile"
            />
          )}
          <h3>
            {currentUser.firstname} {currentUser.lastname}
          </h3>
          <strong>{currentUser.email}</strong>
        </Col>
        <Col md={9} className="d-flex flex-column justify-content-center">
          <Accordion defaultActiveKey="1">
            <Card className="card mb-4">
              <CustomToggle as={Card.Header} eventKey="0">
                My Account
              </CustomToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <>
                    <Table responsive="sm">
                      <thead>
                        <tr>
                          <th className="text-left" colSpan="2">
                            Profile Detail
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>First Name</td>
                          <td>
                            <strong>{currentUser.firstname}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>
                            <strong>{currentUser.lastname}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>
                            <strong>{currentUser.email}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <TutorProfile
                      currentUser={currentUser}
                      updateUser={updateUser}
                      userTitle={userTitle}
                    />
                  </>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="card mb-4">
              <CustomToggle as={Card.Header} eventKey="1">
                My Student List
              </CustomToggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <StudentList
                    userID={currentUser._id}
                    currentUser={currentUser}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="card mb-4">
              <CustomToggle as={Card.Header} eventKey="2">
                Exams/Grades
              </CustomToggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <ExamsGrades userID={currentUser._id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </>
  );
};

export default TutorDetail;
