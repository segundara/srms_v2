import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Button,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import RecordsPDF from "./PdfHandler";

import { useDispatch, useSelector } from "react-redux";

import { setExamsDetails, setTotalExams, downloadPDF } from "../../actions/studentData";
import Pages from "../common/Pages";

const ExamsGrades = () => {
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { totalExams, examsDetails, pdfData } = useSelector(state => state.student);
  const { _id } = useSelector(state => state.me.info);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setTotalPages = (pages) => setPageNumbers(pages);
  const loadingStatus = (value) => setLoading(value);

  const changePage = (value) => setCurrentPage(value);

  const getPDF = () => {
    dispatch(downloadPDF(_id));
  };

  useEffect(() => {
    dispatch(setTotalExams(_id));
    if (totalExams) {
      Pages(totalExams, perPage, setTotalPages, user);
      dispatch(setExamsDetails(currentPage, perPage, _id));
    }
  }, [currentPage, perPage, _id, user, totalExams, dispatch]);

  return (
    <>
      <div>{pdfData && (<RecordsPDF />)}
        {/* <Alert variant="info" show={success}>
          <strong>Record downloaded</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>Something went wrong!!!</strong>
        </Alert> */}
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
        {!loading && examsDetails && pageNumbers.length && (
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
                {examsDetails && examsDetails.map((course, i) => {
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
            <Button variant="secondary" onClick={getPDF}>
              Download Transcript
            </Button>{" "}
          </>
        )}
        {!loading && !examsDetails && (
          <div className="text-center">
            <strong>No record at the moment</strong>
          </div>
        )}
      </div>
    </>
  );
};
export default ExamsGrades;
