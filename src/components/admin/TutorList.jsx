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
import Pagination from "react-bootstrap-4-pagination";

const TutorList = () => {
  const [data, setData] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerTutor = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      departmentid: selectedID,
      password: password,
      title: "tutor",
    };

    try {
      const res = await authAxios.post(`/tutor/register`, data, {
        withCredentials: true,
      });
      let response = [];

      if (!res) {
        const secondRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/tutor/register`,
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

      console.log("New tutor added=> ", response);
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
      const res = await authAxios.get(`/tutor`, { withCredentials: true });
      let tutors = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/tutor`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        tutors = secondRes.data;
      } else {
        tutors = res.data;
      }
      setTotal(tutors.count);
      getPages(tutors.count);
      setLoading(false);
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

  const changePage = (value) => {
    setCurrentPage(value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const skip = currentPage * perPage - perPage;
      const res = await authAxios.get(
        `/tutor?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
      );
      let allTutors = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/tutor?limit=${perPage}&offset=${skip}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allTutors = secondRes.data;
      } else {
        allTutors = res.data;
      }

      setData(allTutors.data);
      setLoading(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    getDepartments();
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
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((tutor, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {currentPage > 1
                          ? (i = i + 1 + perPage * currentPage - perPage)
                          : (i = i + 1)}
                      </td>
                      <td>{tutor.firstname}</td>
                      <td>{tutor.lastname}</td>
                      <td>{tutor.email}</td>
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
            Register New Tutor
          </Button>{" "}
          <Modal
            size="lg"
            show={newModal}
            onHide={() => setNewModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Add New Tutor
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="d-flex flex-column" onSubmit={registerTutor}>
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
                    Add Tutor
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

export default TutorList;
