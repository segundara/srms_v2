// import authAxios from "../../lib/http";
// import Cookies from "js-cookie";
// import axios from "axios";
// import getWithAxios from "../common/getWithAxios";

// const MyCourseList = async (loadingStatus, currentPage, perPage, setDetails, userID) => {
//     loadingStatus(true);
//     const skip = currentPage * perPage - perPage;
//     const url_1 = `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
//     const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
//     const response = await getWithAxios(url_1, url_2);

//     if (response.status === 200) {
//         setDetails(response.data.data);
//         loadingStatus(false);
//     }
//     else {
//         console.log(response);
//         loadingStatus(false);
//     }

//     // loadingStatus(true);
//     // try {
//     //     const skip = currentPage * perPage - perPage;
//     //     const res = await authAxios.get(
//     //         `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
//     //         { withCredentials: true }
//     //     );
//     //     let allCourses = [];

//     //     if (!res) {
//     //         const secondRes = await axios.get(
//     //             `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
//     //             {
//     //                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//     //                 withCredentials: true,
//     //             }
//     //         );
//     //         allCourses = secondRes.data;
//     //     } else {
//     //         allCourses = res.data;
//     //     }

//     //     setDetails(allCourses.data);
//     //     loadingStatus(false);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };

// export default MyCourseList;