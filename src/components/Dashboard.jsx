import React from "react";
import { Container } from "react-bootstrap";
import StudentDetail from "./student/Student";
import TutorDetail from "./tutor/Tutor";
import AdminDetail from "./admin/Admin";
import JumBotron from "./welcome/Welcome";
import "./allrouteStyle/style.scss";
import UserData from "./UserPage";

const Dashboard = (props) => {

  return (
    <>
      {props.userTitle.length > 0 ? (
        <>
          <Container className="mt-3">
            <UserData userTitle={props.userTitle} />
          </Container>
        </>
      ) : (
          <JumBotron />
        )}
    </>
  );
};
export default Dashboard;
