import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import "../allrouteStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";

const MyCourses = ({ userID, updateData }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const res = await authAxios.get(`/register/course_list/${userID}`, {
        withCredentials: true,
      });
      let allCourses = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/register/course_list/${userID}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
          }
        );
        allCourses = secondRes.data;
      } else {
        allCourses = res.data;
      }
      setTotal(allCourses.count);
      getPages(allCourses.count);
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
        `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
      );
      let allCourses = [];

      if (!res) {
        const secondRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
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

  useEffect(() => {
    getTotal();
    fetchData();
  }, [updateData, currentPage]);

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
      {!loading && data && pageNumbers.length > 0 && (
        <>
          <Table responsive="sm" size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Semester</th>
                <th>Registration Date</th>
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
                    <td>{course.reg_date.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between pl-3">
            <Pagination
              totalPages={pageNumbers[i].length}
              currentPage={currentPage}
              threeDots={true}
              prevNext={true}
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
        </>
      )}
      {!loading && data.length < 1 && (
        <div className="text-center" colSpan="5">
          <strong>No record at the moment</strong>
        </div>
      )}
    </div>
  );
};
export default MyCourses;
