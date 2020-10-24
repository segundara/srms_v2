import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import "../allrouteStyle/style.scss";
import { format } from "date-fns";

const StudentProfile = ({ userTitle, currentUser, updateUser }) => {
  const [profileText, setProfileText] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState(currentUser.firstname);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [email, setEmail] = useState(currentUser.email);
  const [dateofbirth, setDateofbirth] = useState(currentUser.dateofbirth);
  const [nationality, setNationality] = useState(currentUser.nationality);

  const saveImg = (event) => setImage(event.target.files[0]);

  const updateProfileText = async (e) => {
    e.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      dateofbirth: dateofbirth,
      nationality: nationality,
    };

    try {
      const res = await authAxios.put(`/${userTitle}/me`, data, {
        withCredentials: true,
      });

      let response = [];

      if (!res) {
        const secondRes = await axios.put(
          `${process.env.REACT_APP_API_URL}/${userTitle}/me`,
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

      console.log(response);
      updateUser(response);
      setProfileText(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
      setProfileText(false);
    }
  };

  const updateProfileImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await authAxios.post(`/${userTitle}/upload/me`, formData, {
        withCredentials: true,
      });
      let response = [];

      if (!res) {
        const secondRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/${userTitle}/upload/me`,
          formData,
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

      console.log(response);
      updateUser(response);
      setProfileImage(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
      setProfileImage(false);
    }
  };

  return (
    <>
      <Button
        className="mb-1"
        variant="secondary"
        onClick={() => setProfileText(true)}
      >
        Update Profile Text
      </Button>{" "}
      <Modal
        size="lg"
        show={profileText}
        onHide={() => setProfileText(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Update Profile Text
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={updateProfileText}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstname">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What is/was your firstname.."
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="lastname">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What is/was your lastname.."
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="What is/was your email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="dateofbirth">
                  <Form.Label>D.O.B</Form.Label>
                  <Form.Control
                    type="date"
                    value={format(new Date(dateofbirth), "yyyy-MM-dd")}
                    onChange={(e) => setDateofbirth(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="nationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Which country are you from"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="align-self-center mr-4"
                variant="warning"
                type="submit"
              >
                Update Now
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        className="mb-1"
        variant="secondary"
        onClick={() => setProfileImage(true)}
      >
        Update Profile Image
      </Button>{" "}
      <Modal
        size="sm"
        show={profileImage}
        onHide={() => setProfileImage(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Update Profile Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={updateProfileImage}>
            <Row>
              <Col md={6}>
                <label>Image</label>
                <br></br>
                <input
                  type="file"
                  id="imageFile"
                  profile="file"
                  onChange={saveImg}
                  accept="imageFile/*"
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="align-self-center mr-4"
                variant="warning"
                type="submit"
              >
                Update Photo
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentProfile;
