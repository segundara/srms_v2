// import authAxios from "../../lib/http";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Pages from "../common/Pages"
// import getWithAxios from "../common/getWithAxios";

// const TotalExams = async (userID, userTitle, getTotal, perPage, setTotalPages) => {
//     const url_1 = `/exams/${userID}`;
//     const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}`;
//     const response = await getWithAxios(url_1, url_2);

//     if (response.status === 200) {
//         getTotal(response.data.count);
//         Pages(response.data.count, perPage, setTotalPages, userTitle);
//     }
//     else {
//         console.log(response);
//     }

//     // try {
//     //     const res = await authAxios.get(`/exams/${userID}`, {
//     //         withCredentials: true,
//     //     });
//     //     let exams = [];

//     //     if (!res) {
//     //         const secondRes = await axios.get(
//     //             `${process.env.REACT_APP_API_URL}/exams/${userID}`,
//     //             {
//     //                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//     //                 withCredentials: true,
//     //             }
//     //         );
//     //         exams = secondRes.data;
//     //     } else {
//     //         exams = res.data;
//     //     }
//     //     getTotal(exams.count);
//     //     Pages(exams.count, perPage, setTotalPages, userTitle);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };

// export default TotalExams;