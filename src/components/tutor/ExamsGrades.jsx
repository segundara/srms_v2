import React, { useState, useEffect } from "react";
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
  Alert,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import { format } from "date-fns";
import Pagination from "react-bootstrap-4-pagination";
import Pages from "../common/Pages"

import { setGradingService, clearGradingService, setTotalStudentsByExam, setExamsRecords, clearExamsRecords } from "../../actions/tutorData";
import { useSelector, useDispatch } from "react-redux";

function ExamsGrades() {

  const { user } = useSelector(state => state.auth);
  const { info } = useSelector(state => state.me);
  const { totalStudentsByExam, gradingService, examsRecords } = useSelector(state => state.tutor);

  const dispatch = useDispatch();

  const userTitle = user;
  const userID = info._id;

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

  const setTotalPages = (pages) => setPageNumbers(pages);
  const loadingStatus = (value) => setLoading(value);
  const changePage = (value) => setCurrentPage(value);

  const updateGrade = async (e) => {
    e.preventDefault();

    const data = {
      grade: grade,
    };

    dispatch(setGradingService(data, studentid, examid));
    setTimeout(() => {
      setGradeModal(false)
      setGrade("")
    }, 1000);
    setTimeout(() => {
      dispatch(clearGradingService());
    }, 5000);
  };

  useEffect(() => {
    setLoading(true)
    if (!totalStudentsByExam) {
      dispatch(setTotalStudentsByExam(userID));
    }
    if (totalStudentsByExam) {
      Pages(totalStudentsByExam, perPage, setTotalPages, userTitle);
      dispatch(setExamsRecords(currentPage, perPage, userID));
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }

  }, [gradeModal, currentPage, perPage, userID, totalStudentsByExam, dispatch, userTitle]);

  console.log(data);
  return (
    <div>
      {gradingService && gradingService.status === 200 && (
        <Alert variant="info">
          <strong>Graded successfully!!!</strong>
        </Alert>
      )}
      {gradingService && gradingService.status !== 200 && (
        <Alert variant="info">
          <strong>Problem ecountered while trying to save the grade!!!</strong>
        </Alert>
      )}
      {examsRecords && pageNumbers.length && (
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="0"
          onSelect={() => changePage(1)}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {examsRecords.map((course, i) => {
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
                {examsRecords.map((list, i) => {
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
                                          onClick={() => {
                                            setGradeModal(true);
                                            setExamid(s._id);
                                            setStudentid(s.studentid);
                                          }}
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
                      {!loading && !list.students && (
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
      {!loading && !examsRecords && (
        <p className="text-center">
          <strong>No record at the moment!</strong>
        </p>
      )}
    </div>
  );
}

export default ExamsGrades;
