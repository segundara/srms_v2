import React, { useState, useEffect } from "react";
import "../commonStyle/style.scss";
import {
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { format } from "date-fns";
import Pagination from "react-bootstrap-4-pagination";
import Pages from "../common/Pages"

import { setTutors, setCoursesDetails, setTotalCourses, setNewCourse, clearNewCourse } from "../../actions/adminData";
import { useSelector, useDispatch } from "react-redux";

const CourseList = () => {

  const { user } = useSelector(state => state.auth);

  const { totalCourses, coursesDetails, tutors, newCourse } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const userTitle = user;

  const [newModal, setNewModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [examdate, setExamdate] = useState("");
  const [lecturerID, setLecturerID] = useState("");
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const setTotalPages = (pages) => setPageNumbers(pages);

  const addNewCourse = async (e) => {
    e.preventDefault();

    const data = {
      name: courseName,
      description: description,
      semester: semester,
      lecturerid: lecturerID,
      examdate: examdate,
    };

    dispatch(setNewCourse(data))

    setTimeout(() => {
      setNewModal(false)
      dispatch(setTotalCourses())
    }, 1000);
    setTimeout(() => {
      dispatch(clearNewCourse());
    }, 5000);


  };

  const changePage = (value) => setCurrentPage(value);
  const getLecturerID = (e) => setLecturerID(e.target.value);

  useEffect(() => {
    dispatch(setTotalCourses())
    dispatch(setTutors())

    if (totalCourses) {
      Pages(totalCourses, perPage, setTotalPages, userTitle);
      dispatch(setCoursesDetails(currentPage, perPage))
    }

  }, [dispatch, currentPage, totalCourses, perPage, userTitle]);

  return (
    <>
      <div>
        {newCourse && newCourse.status === 200 && (
          <Alert variant="info">
            <strong>New Course Added</strong>
          </Alert>
        )}
        {newCourse && newCourse.status !== 200 && (
          <Alert variant="danger">
            <strong>Something went wrong!!!</strong>
          </Alert>
        )}
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
        {!loading && coursesDetails && pageNumbers.length > 0 && (
          <>
            {console.log(pageNumbers)}
            <Table responsive="sm" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                </tr>
              </thead>
              <tbody>
                {coursesDetails.map((course, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {currentPage > 1
                          ? (i = i + 1 + perPage * currentPage - perPage)
                          : (i = i + 1)}
                      </td>
                      <td>{course.name}</td>
                      <td>{course.description}</td>
                      <td>{course.semester}</td>
                      <td>{format(new Date(course.examdate), "yyyy-MM-dd")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between pl-3">

              <Pagination
                threeDots
                totalPages={pageNumbers.length}
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
                <strong>{pageNumbers.length}</strong>
              </Alert>
            </div>
            <Button variant="secondary" onClick={() => setNewModal(true)}>
              Add New Course
          </Button>{" "}
            <Modal
              size="lg"
              show={newModal}
              onHide={() => setNewModal(false)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Add New Course
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="d-flex flex-column" onSubmit={addNewCourse}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="courseName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="Course name here..."
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="Description..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="Period of teaching..."
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="examdate">
                        <Form.Label>Exam Date</Form.Label>
                        <Form.Control
                          type="date"
                          required={true}
                          placeholder="Date to conduct exam..."
                          value={examdate}
                          onChange={(e) => setExamdate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="tutors">
                        <Form.Label>Select Tutor</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          required
                          onChange={getLecturerID}
                        >
                          <option></option>
                          {tutors.map((key, i) => {
                            return (
                              <option key={i} value={key._id}>
                                {key.firstname} {key.lastname}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      className="align-self-center mr-4"
                      variant="warning"
                      type="submit"
                    >
                      Add Course
                  </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
        {!loading && !coursesDetails && (
          <p className="text-center">
            <strong>No information yet</strong>
          </p>
        )}
      </div>
    </>
  );
};

export default CourseList;
