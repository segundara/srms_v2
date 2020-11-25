import React, { useState, useEffect } from "react";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import "../allrouteStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";

const StudentList = ({ userID, currentUser }) => {
  const [data, setData] = useState([]);
  const [totalArr, setTotalArr] = useState([]);
  //   const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [emailModal, setEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    const courses = await getCourses();
    let totalStudent = [];
    if (courses) {
      for (const course of courses) {
        let student = [];
        try {
          const res = await authAxios.get(
            `/register/student_list/${course._id}`,
            { withCredentials: true }
          );

          if (!res) {
            const secondRes = await axios.get(
              `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                withCredentials: true,
              }
            );
            student = secondRes.data;
          } else {
            student = res.data;
          }
          totalStudent.push(student.count);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setTotalArr(totalStudent);
    getPages(totalStudent);
  };

  const getPages = (totalItem) => {
    const pages = [];
    for (let i = 0; i < totalItem.length; i++) {
      const element = totalItem[i];
      let innerPages = [];
      for (let j = 1; j <= Math.ceil(element / perPage); j++) {
        innerPages.push(j);
      }
      pages.push(innerPages);
    }
    setPageNumbers(pages);
  };

  const changePage = (value) => setCurrentPage(value);

  const getCourses = async () => {
    try {
      const res = await authAxios.get(`/courses/${userID}`, {
        withCredentials: true,
      });
      let allCourses = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/${userID}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allCourses = secondRes.data;
      } else {
        allCourses = res.data;
      }
      return allCourses;
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    setLoading(true);
    let allStudents = [];
    const courses = await getCourses();
    if (courses) {
      for (const course of courses) {
        let student = [];
        let eachList = {};

        try {
          const skip = currentPage * perPage - perPage;
          const res = await authAxios.get(
            `/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
          );

          if (!res) {
            const secondRes = await axios.get(
              `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                withCredentials: true,
              }
            );
            student = secondRes.data;
          } else {
            student = res.data;
          }
          eachList.name = course.name;
          eachList.students = student.data;
          console.log(student);
          allStudents.push(eachList);
        } catch (error) {
          console.log(error);
        }
      }
      setData(allStudents);
    }
    setLoading(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = {
      sender: currentUser.email,
      recipient: recipientEmail,
      subject: emailSubject,
      content: emailContent,
    };
    console.log(data);
    try {
      const res = await authAxios.post(`/tutor/email/ToStudent`, data, {
        withCredentials: true,
      });
      let response;

      if (!res) {
        const secondRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/tutor/email/ToStudent`,
          data,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        response = secondRes;
      } else {
        response = res;
      }
      console.log(response.data);
      setEmailModal(false);
    } catch (error) {
      console.log(error);
      setEmailModal(false);
    }
  };

  useEffect(() => {
    getTotal();
    getStudents();
  }, [currentPage]);

  console.log(data.length, data);
  return (
    <div>
      {data && data.length > 0 && (
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="0"
          onSelect={() => changePage(1)}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {data.map((course, i) => {
                  return (
                    <Nav.Item key={i}>
                      <Nav.Link
                        eventKey={i}
                        className="d-flex justify-content-between btn-link px-1"
                      >
                        <small>
                          <b>{course.name}</b>
                        </small>
                        <Badge variant="light">
                          <span>{totalArr[i]}</span>
                        </Badge>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {data.map((list, i) => {
                  return (
                    <Tab.Pane key={i} eventKey={i}>
                      {loading && (
                        <div
                          style={{
                            width: "10%",
                            height: "auto",
                            margin: "auto",
                          }}
                        >
                          <Spinner animation="border" variant="dark" />
                        </div>
                      )}
                      {!loading &&
                        list.students.length > 0 &&
                        pageNumbers &&
                        pageNumbers.length > 0 && (
                          <>
                            <Table responsive="sm" size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  {/* <th>Email</th> */}
                                  <th>Message</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list.students.map((s, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>
                                        {currentPage > 1
                                          ? (i =
                                            i +
                                            1 +
                                            perPage * currentPage -
                                            perPage)
                                          : (i = i + 1)}
                                      </td>
                                      <td>{s.firstname}</td>
                                      <td>{s.lastname}</td>
                                      {/* <td>{s.email}</td> */}
                                      <td className="text-center">
                                        <Button
                                          variant="secondary"
                                          onClick={() => (
                                            setEmailModal(true),
                                            setRecipientEmail(s.email),
                                            setRecipientFirstName(s.firstname),
                                            setRecipientLastName(s.lastname)
                                          )}
                                        >
                                          <FontAwesomeIcon icon={faEnvelope} />
                                        </Button>
                                      </td>
                                      <Modal
                                        size="md"
                                        show={emailModal}
                                        onHide={() => setEmailModal(false)}
                                        aria-labelledby="example-modal-sizes-title-sm"
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title id="example-modal-sizes-title-sm">
                                            Sending Email To {recipientFirstName} {recipientLastName}
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Form
                                            className="d-flex flex-column"
                                            onSubmit={sendEmail}
                                          >
                                            <Row>
                                              <Col md={12}>
                                                <Form.Group controlId="subject">
                                                  <Form.Label>
                                                    Subject
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    required={true}
                                                    placeholder="Enter Subject"
                                                    value={emailSubject}
                                                    onChange={(e) =>
                                                      setEmailSubject(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </Form.Group>
                                                <Form.Group controlId="content">
                                                  <Form.Label>
                                                    Content
                                                  </Form.Label>
                                                  <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    required={true}
                                                    placeholder="Enter Content"
                                                    value={emailContent}
                                                    onChange={(e) =>
                                                      setEmailContent(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </Form.Group>
                                              </Col>
                                            </Row>
                                            <div className="d-flex justify-content-center">
                                              <Button
                                                className="align-self-center mr-4"
                                                variant="warning"
                                                type="submit"
                                              >
                                                Send
                                              </Button>
                                            </div>
                                          </Form>
                                        </Modal.Body>
                                      </Modal>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                            <div className="d-flex justify-content-between pl-3">

                              <Pagination
                                totalPages={pageNumbers[i].length}
                                currentPage={currentPage}
                                showMax={2}
                                prevNext
                                activeBgColor="#504c8a"
                                color="#504c8a"
                                activeBorderColor="#504c8a"
                                onClick={(page) => changePage(page)}
                              />

                              <Alert variant="light" className="text-right">
                                page <strong>{currentPage}</strong> of{" "}
                                <strong>{pageNumbers[i].length}</strong>
                              </Alert>
                            </div>
                          </>
                        )}
                      {!loading && list.students.length < 1 && (
                        <p className="text-center">
                          <strong>No student in this course</strong>
                        </p>
                      )}
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
      {!loading && data.length < 1 && (
        <p className="text-center">
          <strong>No record at the moment!</strong>
        </p>
      )}
    </div>
  );
};

export default StudentList;
