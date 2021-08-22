import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";

import { useDispatch, useSelector } from "react-redux";

import { setMyCourseList, setTotalRegisteredCourses } from "../../actions/studentData";
import Pages from "../common/Pages";

const MyCourses = () => {
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { totalRegisteredCourses, myCourseList } = useSelector(state => state.student);

  const { _id } = useSelector(state => state.me.info);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setTotalPages = (pages) => setPageNumbers(pages);

  const changePage = (value) => setCurrentPage(value);

  useEffect(() => {
    setLoading(true);
    dispatch(setTotalRegisteredCourses(_id));

    if (totalRegisteredCourses) {
      Pages(totalRegisteredCourses, perPage, setTotalPages, user);
      dispatch(setMyCourseList(currentPage, perPage, _id));
    }

    setLoading(false);
  }, [totalRegisteredCourses, currentPage, dispatch, perPage, _id, user]);

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
      {!loading && myCourseList && pageNumbers.length && (
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
              {myCourseList && myCourseList.map((course, i) => {
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
        </>
      )}
      {!loading && !myCourseList && (
        <div className="text-center" colSpan="5">
          <strong>No record at the moment</strong>
        </div>
      )}
    </div>
  );
};
export default MyCourses;
