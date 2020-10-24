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
} from "react-bootstrap";

const StudentList = () => {
  const [data, setData] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(true);

  const registerStudent = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      dateofbirth: dateofbirth,
      nationality: nationality,
      departmentid: selectedID,
      password: password,
      title: "student",
    };

    try {
      const res = await authAxios.post(`/student/register`, data, {
        withCredentials: true,
      });
      let response = [];

      if (!res) {
        const secondRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/student/register`,
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

      console.log("New student added=> ", response);
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
      const res = await authAxios.get(`/student`, { withCredentials: true });
      let students = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/student`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        students = secondRes.data;
      } else {
        students = res.data;
      }
      setTotal(students.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (value) => {
    setCurrentPage(value);
  };

  const fetchData = async () => {
    try {
      const skip = currentPage * perPage - perPage;
      const res = await authAxios.get(
        `/student?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
      );
      let allStudents = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/student?limit=${perPage}&offset=${skip}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allStudents = secondRes.data;
      } else {
        allStudents = res.data;
      }

      setData(allStudents.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await authAxios.get(`/departments`, {
        withCredentials: true,
      });
      let allDepartments = [];

      if (!response) {
        const secondResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/departments`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allDepartments = secondResponse.data;
      } else {
        allDepartments = response.data;
      }

      setDepartments(allDepartments.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    fetchData();
    getDepartments();
  }, [success, currentPage]);

  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Student successfully registered</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>Something went wrong!!!</strong>
        </Alert>
      </div>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((student, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {currentPage > 1
                        ? (i = i + 1 + perPage * currentPage - perPage)
                        : (i = i + 1)}
                    </td>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.email}</td>
                    <td>{student.nationality}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={1}
            className="py-3"
          >
            {pageNumbers.map((number) => {
              if (
                number === 1 ||
                number === pageNumbers.length ||
                (number > currentPage - 3 && number < currentPage + 3)
              ) {
                return (
                  <ToggleButton
                    variant="primary"
                    key={number}
                    value={number}
                    onClick={() => changePage(number)}
                  >
                    {" "}
                    {number}
                  </ToggleButton>
                );
              } else {
                if (number < 3) {
                  return (
                    <ToggleButton
                      variant="primary"
                      key={number}
                      value={number}
                      onClick={() => changePage(number)}
                    >
                      {" "}
                      {"<<"}
                    </ToggleButton>
                  );
                } else if (number > pageNumbers.length - 2) {
                  return (
                    <ToggleButton
                      variant="primary"
                      key={number}
                      value={number}
                      onClick={() => changePage(number)}
                    >
                      {" "}
                      {">>"}
                    </ToggleButton>
                  );
                }
              }
            })}
          </ToggleButtonGroup>

          <Alert variant="light" className="text-right">
            page <strong>{currentPage}</strong> of{" "}
            <strong>{pageNumbers.length}</strong>
          </Alert>
        </div>
        <Button variant="secondary" onClick={() => setNewModal(true)}>
          Register New Student
        </Button>{" "}
        <Modal
          size="lg"
          show={newModal}
          onHide={() => setNewModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Add New Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="d-flex flex-column" onSubmit={registerStudent}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="firstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="What is firstname.."
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="What is lastname.."
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email here.."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="dateofbirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth..."
                      value={dateofbirth}
                      onChange={(e) => setDateofbirth(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nationality..."
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Label>Select Department</Form.Label>
                  <DropdownButton
                    as={ButtonGroup}
                    className="mx-3"
                    key="right"
                    id={`dropdown-button-drop-right`}
                    drop="right"
                    variant="secondary"
                    title={selectedDept.toUpperCase()}
                  >
                    {departments.map((key, i) => {
                      return (
                        <Dropdown.Item
                          key={i}
                          eventKey={key.name}
                          onClick={() => (
                            setSelectedDept(key.name), setSelectedID(key._id)
                          )}
                        >
                          {key.name}
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
                  Add Student
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default StudentList;
