import React from "react";
import {
  Accordion,
  Table,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import Profile from "../common/Profile";
import StudentList from "./MyStudentList";
import ExamsGrades from "../tutor/ExamsGrades";
import "../commonStyle/style.scss";
import CustomToggle from "../common/CustomToggle";

import { useSelector } from "react-redux";

const TutorDetail = () => {

  const { user } = useSelector(state => state.auth);
  const { info } = useSelector(state => state.me);

  const userTitle = user;
  const currentUser = info;

  return (
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
        <h3 className="mt-3 mb-0">
          {currentUser.firstname} {currentUser.lastname}
        </h3>
        <strong>{currentUser.email}</strong>
      </Col>
      <Col md={9} className="d-flex flex-column justify-content-center">
        <h1 className="pageTitle">
          {userTitle.charAt(0).toUpperCase() +
            userTitle.slice(1)}{" "}
              Dashboard
        </h1>
        <Accordion defaultActiveKey="1">
          <Card className="accordion-card">
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
                  <Profile />
                </>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="accordion-card">
            <CustomToggle as={Card.Header} eventKey="1">
              My Student List
            </CustomToggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <StudentList />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="accordion-card">
            <CustomToggle as={Card.Header} eventKey="2">
              Exams/Grades
            </CustomToggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <ExamsGrades />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default TutorDetail;
