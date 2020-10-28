import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import download from "downloadjs";
import "../allrouteStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";

const ExamsGrades = ({ userID, updateData }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const res = await authAxios.get(`/exams/${userID}`, {
        withCredentials: true,
      });
      let exams = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/exams/${userID}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        exams = secondRes.data;
      } else {
        exams = res.data;
      }
      setTotal(exams.count);
      getPages(exams.count);
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

  const getPDF = async () => {
    try {
      const res = await authAxios.get(`/exams/${userID}/pdf`, {
        responseType: "blob",
        withCredentials: true,
      });
      let result = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            responseType: "blob",
            withCredentials: true,
          }
        );
        result = await secondRes;
      } else {
        result = await res;
      }
      const content = result.headers["content-type"];
      download(result.data, "Transcript", content);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 5000);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const skip = currentPage * perPage - perPage;
      const res = await authAxios.get(
        `/exams/${userID}?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
      );
      let examInfo = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        examInfo = secondRes.data;
      } else {
        examInfo = res.data;
      }

      setData(examInfo.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    fetchData();
  }, [updateData, currentPage]);

  console.log(data);

  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Record downloaded</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>Something went wrong!!!</strong>
        </Alert>
      </div>
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
        {!loading && data && data.length > 0 && pageNumbers.length > 0 && (
          <>
            <Table responsive="sm" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                  <th>Grade</th>
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
                      <td>{course.examdate.slice(0, 10)}</td>
                      <td>{course.grade}</td>
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
            <Button variant="secondary" onClick={getPDF}>
              Download Transcript
            </Button>{" "}
          </>
        )}
        {!loading && !data && (
          <div className="text-center">
            <strong>No record at the moment</strong>
          </div>
        )}
      </div>
    </>
  );
};
export default ExamsGrades;
