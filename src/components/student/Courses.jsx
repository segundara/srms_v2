import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";

import {
  setCoursesDetails,
  setTotalCourses,
  resgisterForCourse,
  resetResgisterForCourse,
  setMyCourseList,
  setTotalRegisteredCourses,
  setExamsDetails,
  setTotalExams
} from "../../actions/studentData";
import { clearMessage } from "../../actions/message"
import Pages from "../common/Pages";

const AllCourses = () => {
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { totalCourses, coursesDetails, courseRegisterStatusCode } = useSelector(state => state.student);
  const { message } = useSelector(state => state.message);
  const { _id } = useSelector(state => state.me.info);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setTotalPages = (pages) => setPageNumbers(pages);
  const loadingStatus = (value) => setLoading(value);

  const changePage = (value) => setCurrentPage(value);

  const registerCourse = async (courseid, examdate) => {

    const data = {
      studentid: _id,
      courseid: courseid,
      reg_date: format(new Date(), "yyyy-MM-dd"),
      examdate: examdate,
    };

    dispatch(resgisterForCourse(data));

    setTimeout(() => {
      dispatch(resetResgisterForCourse());
      dispatch(clearMessage());
      dispatch(setTotalRegisteredCourses(_id));
      dispatch(setTotalExams(_id));
      dispatch(setMyCourseList(currentPage, perPage, _id));
      dispatch(setExamsDetails(currentPage, perPage, _id));
    }, 5000);

  };

  useEffect(() => {
    dispatch(setTotalCourses());
    if (totalCourses) {
      Pages(totalCourses, perPage, setTotalPages, user);
      dispatch(setCoursesDetails(currentPage, perPage));
    }
  }, [currentPage, totalCourses, dispatch, perPage, user]);

  return (
    <>
      <div>
        {courseRegisterStatusCode === 201 && (
          <Alert variant="info">
            <strong>Course registration successful!!!</strong>
          </Alert>
        )}
        {courseRegisterStatusCode === 400 && (
          <Alert variant="danger">
            <strong>
              {message}
            </strong>
          </Alert>
        )}
        {courseRegisterStatusCode && courseRegisterStatusCode !== 201 && courseRegisterStatusCode !== 400 && (
          <Alert variant="danger">
            <strong>
              Ooops!!! Registration not completed. Check out with the admin!
            </strong>
          </Alert>
        )}
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
        {!loading && coursesDetails && pageNumbers.length && (
          <>
            <Table responsive="sm" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                  <th>Click To Register</th>
                </tr>
              </thead>
              <tbody>
                {coursesDetails &&
                  coursesDetails.map((course, i) => {
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
                        <td className="text-center">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              registerCourse(course._id, course.examdate)
                            }
                          >
                            <FontAwesomeIcon icon={faRegistered} />
                          </Button>
                        </td>
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
        {!loading && !coursesDetails && (
          <p className="text-center">
            <strong>No information yet</strong>
          </p>
        )}
      </div>
    </>
  );
};
export default AllCourses;
