// // import authAxios from "../../lib/http";
// // import Cookies from "js-cookie";
// // import axios from "axios";
// // import Pages from "../common/Pages"
// // import getWithAxios from "../common/getWithAxios";

// // const TotalRegisteredCourses = async (userID, userTitle, getTotal, perPage, setTotalPages) => {
// //     const url_1 = `/register/course_list/${userID}`;
// //     const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}`;
// //     const response = await getWithAxios(url_1, url_2);

// //     if (response.status === 200) {
// //         getTotal(response.data.count);
// //         Pages(response.data.count, perPage, setTotalPages, userTitle);
// //     }
// //     else {
// //         console.log(response);
// //     }

// //     // try {
// //     //     const res = await authAxios.get(`/register/course_list/${userID}`, {
// //     //         withCredentials: true,
// //     //     });
// //     //     let allCourses = [];

// //     //     if (!res) {
// //     //         const secondRes = await axios.get(
// //     //             `${process.env.REACT_APP_API_URL}/register/course_list/${userID}`,
// //     //             {
// //     //                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
// //     //                 withCredentials: true,
// //     //             }
// //     //         );
// //     //         allCourses = secondRes.data;
// //     //     } else {
// //     //         allCourses = res.data;
// //     //     }
// //     //     getTotal(allCourses.count);
// //     //     Pages(allCourses.count, perPage, setTotalPages, userTitle);
// //     // } catch (error) {
// //     //     console.log(error);
// //     // }
// // };

// // export default TotalRegisteredCourses;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";

// import { setMyCourseList, setTotalRegisteredCourses } from "../../actions/studentData";
// import Pages from "../common/Pages";
// import MyCourses from './Registered';

// const TotalRegisteredCourses = () => {
//     const [perPage, setPerPage] = useState(2);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageNumbers, setPageNumbers] = useState([]);

//     const setTotalPages = (pages) => setPageNumbers(pages);

//     const { totalRegisteredCourses, myCourseList } = useSelector(state => state.data);
//     const { _id } = useSelector(state => state.me.info);
//     const { user } = useSelector(state => state.auth);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(setTotalRegisteredCourses(_id));
//         if (totalRegisteredCourses) {
//             Pages(totalRegisteredCourses, perPage, setTotalPages, user);
//             dispatch(setMyCourseList(currentPage, perPage, _id));
//         }
//     }, [currentPage, totalRegisteredCourses, _id, dispatch, perPage, user])

//     return (
//         <div>
//             {/* <MyCourses /> */}
//         </div>
//     )
// }

// export default TotalRegisteredCourses
