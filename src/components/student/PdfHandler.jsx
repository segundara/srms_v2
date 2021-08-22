import React from "react";
import download from "downloadjs";
import { useDispatch, useSelector } from "react-redux";

import { clearDownloadPDF } from "../../actions/studentData";

const RecordsPDF = () => {

    const { pdfData } = useSelector(state => state.student);
    const dispatch = useDispatch();

    const content = pdfData.headers["content-type"];
    download(pdfData.data, "Transcript", content);

    dispatch(clearDownloadPDF())

    return <div></div>;
};

export default RecordsPDF;
