import React, { useState, useEffect } from "react";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../allrouteStyle/style.scss";
import { format } from "date-fns";
import Pagination from "react-bootstrap-4-pagination";

function ExamsGrades({ userID }) {
  const [data, setData] = useState([]);
  const [grade, setGrade] = useState("");
  const [gradeModal, setGradeModal] = useState(false);
  const [examid, setExamid] = useState("");
  const [studentid, setStudentid] = useState("");
  const [totalArr, setTotalArr] = useState([]);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    const courses = await getCourses();
    let totalStudent = [];
    if (courses) {
      for (const course of courses) {
        let student = [];
        try {
          const res = await authAxios.get(`/exams/student_list/${course._id}`, {
            withCredentials: true,
          });

          if (!res) {
            const secondRes = await axios.get(
              `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}`,
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

  const updateGrade = async (e) => {
    e.preventDefault();
    console.log("examid: ", examid, "studentid: ", studentid);
    const data = {
      grade: grade,
    };

    try {
      const res = await authAxios.put(`/exams/${studentid}/${examid}`, data, {
        withCredentials: true,
      });

      let response = [];

      if (!res) {
        const secondRes = await axios.put(
          `${process.env.REACT_APP_API_URL}/exams/${studentid}/${examid}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        response = secondRes.data;
      } else {
        response = res.data;
      }

      console.log("response from gradeUpdate=>", response);

      setGradeModal(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
      setGradeModal(false);
    }
  };

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

  const getExamsRecords = async () => {
    setLoading(true);
    let allStudents = [];
    const courses = await getCourses();
    if (courses) {
      for (const course of courses) {
        let student = [];
        let eachRecord = {};
        try {
          const skip = currentPage * perPage - perPage;
          const res = await authAxios.get(
            `/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
          );

          if (!res) {
            const secondRes = await axios.get(
              `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
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
          eachRecord.name = course.name;
          eachRecord.students = student.data;
          console.log(student);
          allStudents.push(eachRecord);
        } catch (error) {
          console.log(error);
        }
      }
      setData(allStudents);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTotal();
    getExamsRecords();
  }, [gradeModal, currentPage]);

  console.log(data);
  return (
    <div>
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
      {!loading && data && data.length > 0 && (
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="0"
        // onSelect={() => changePage(1)}
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
                      {list.students.length > 0 &&
                        pageNumbers &&
                        pageNumbers.length > 0 && (
                          <>
                            <Table responsive="sm" size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Exam date</th>
                                  <th>Grade</th>
                                  <th>Upload Grade</th>
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
                                      <td>
                                        {format(
                                          new Date(s.examdate),
                                          "yyyy-MM-dd"
                                        )}
                                      </td>
                                      <td className="text-center">{s.grade}</td>
                                      <td className="text-center">
                                        <Button
                                          variant="secondary"
                                          onClick={() => (
                                            setGradeModal(true),
                                            setExamid(s._id),
                                            setStudentid(s.studentid)
                                          )}
                                        >
                                          Add
                                        </Button>
                                      </td>
                                      <Modal
                                        size="sm"
                                        show={gradeModal}
                                        onHide={() => setGradeModal(false)}
                                        aria-labelledby="example-modal-sizes-title-sm"
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title id="example-modal-sizes-title-sm">
                                            Update Grade
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Form
                                            className="d-flex flex-column"
                                            onSubmit={updateGrade}
                                          >
                                            <Row>
                                              <Col md={6}>
                                                <Form.Group controlId="grade">
                                                  <Form.Label>Grade</Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    required={true}
                                                    placeholder="Enter Grade"
                                                    value={grade}
                                                    onChange={(e) =>
                                                      setGrade(e.target.value)
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
                                                Update Grade
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
                                threeDots
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
                      {list.students.length < 1 && (
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
}

export default ExamsGrades;
