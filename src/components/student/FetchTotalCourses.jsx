// import authAxios from "../../lib/http";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Pages from "../common/Pages"
// import getWithAxios from "../common/getWithAxios";
// import UserService from "../../services/student.service";

// const TotalCourses = async (userTitle, getTotal, perPage, setTotalPages) => {
//     const url_1 = `/courses`;
//     const url_2 = `${process.env.REACT_APP_API_URL}/courses`;
//     const response = await getWithAxios(url_1, url_2);

//     if (response.status === 200) {
//         getTotal(response.data.count);
//         Pages(response.data.count, perPage, setTotalPages, userTitle);
//     }
//     else {
//         console.log(response);
//     }


//     // try {
//     //     const res = await authAxios.get(`/courses`, { withCredentials: true });
//     //     let allCourses = [];

//     //     if (!res) {
//     //         const secondRes = await axios.get(
//     //             `${process.env.REACT_APP_API_URL}/courses`,
//     //             {
//     //                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//     //                 withCredentials: true,
//     //             }
//     //         );
//     //         allCourses = secondRes.data;
//     //     } else {
//     //         allCourses = res.data;
//     //     }
//     //     getTotal(allCourses.count);
//     //     Pages(allCourses.count, perPage, setTotalPages, userTitle);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };

// export default TotalCourses;
