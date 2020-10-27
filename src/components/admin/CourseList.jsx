import React, { useState, useEffect } from "react";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import "../allrouteStyle/style.scss";
import {
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import { format } from "date-fns";
import Pagination from "react-bootstrap-4-pagination";

const CourseList = () => {
  const [data, setData] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [examdate, setExamdate] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [lecturerID, setLecturerID] = useState("");
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const addNewCourse = async (e) => {
    e.preventDefault();
    const data = {
      name: courseName,
      description: description,
      semester: semester,
      lecturerid: lecturerID,
      examdate: examdate,
    };

    try {
      const res = await authAxios.post(`/courses`, data, {
        withCredentials: true,
      });
      let response = [];

      if (!res) {
        const secondRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/courses`,
          data,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        response = await secondRes.data;
      } else {
        response = await res.data;
      }

      console.log("New course added=> ", response);
      setNewModal(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      setNewModal(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 10000);
    }
  };

  const getTotal = async () => {
    try {
      const res = await authAxios.get(`/courses`, { withCredentials: true });
      let courses = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        courses = secondRes.data;
      } else {
        courses = res.data;
      }
      setTotal(courses.count);
      getPages(courses.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getPages = (totalItem) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalItem / perPage); i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
  };

  const changePage = (value) => setCurrentPage(value);

  const fetchData = async () => {
    setLoading(true);
    try {
      const skip = currentPage * perPage - perPage;
      const res = await authAxios.get(
        `/courses?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
      );
      let allCourses = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allCourses = secondRes.data;
      } else {
        allCourses = res.data;
      }

      setData(allCourses.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTutors = async () => {
    try {
      const response = await authAxios.get(`/tutor`, { withCredentials: true });
      let allTutors = [];

      if (!response) {
        const secondResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/tutor`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allTutors = secondResponse.data;
      } else {
        allTutors = response.data;
      }

      setTutors(allTutors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    getTutors();
    fetchData();
  }, [success, currentPage]);

  return (
    <div className="text-center">
      {loading && (
        <div
          style={{
            width: "10%",
            height: "auto",
          }}
        >
          <Spinner animation="border" variant="dark" />
        </div>
      )}
      {!loading && data && pageNumbers.length > 0 && (
        <>
          {console.log(pageNumbers)}
          <Table responsive="sm">
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
              {data.map((course, i) => {
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
          <div className="d-flex justify-content-between">
            <Pagination
              threeDots
              totalPages={pageNumbers.length}
              currentPage={currentPage}
              showMax={7}
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
                        placeholder="Course name here..."
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="semester">
                      <Form.Label>Semester</Form.Label>
                      <Form.Control
                        type="text"
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
                        placeholder="Date to conduct exam..."
                        value={examdate}
                        onChange={(e) => setExamdate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Label>Select Tutor</Form.Label>
                    <DropdownButton
                      as={ButtonGroup}
                      className="mx-3"
                      key="right"
                      id={`dropdown-button-drop-right`}
                      drop="right"
                      variant="secondary"
                      title={selectedTutor.toUpperCase()}
                    >
                      {tutors.map((key, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            eventKey={key._id}
                            onClick={() => (
                              setSelectedTutor(
                                `${key.firstname} ${key.lastname}`
                              ),
                              setLecturerID(key._id)
                            )}
                          >
                            {key.firstname} {key.lastname}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
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
      {!loading && !data && (
        <p className="text-center">
          <strong>No information yet</strong>
        </p>
      )}
    </div>
  );
};

export default CourseList;
