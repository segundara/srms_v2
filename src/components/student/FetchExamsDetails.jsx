// import authAxios from "../../lib/http";
// import Cookies from "js-cookie";
// import axios from "axios";
// import getWithAxios from "../common/getWithAxios";

// const ExamsDetails = async (loadingStatus, currentPage, perPage, setDetails, userID) => {
//     loadingStatus(true);
//     const skip = currentPage * perPage - perPage;
//     const url_1 = `/exams/${userID}?limit=${perPage}&offset=${skip}`;
//     const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`;
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
//     //         `/exams/${userID}?limit=${perPage}&offset=${skip}`,
//     //         { withCredentials: true }
//     //     );
//     //     let examInfo = [];

//     //     if (!res) {
//     //         const secondRes = await axios.get(
//     //             `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`,
//     //             {
//     //                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//     //                 withCredentials: true,
//     //             }
//     //         );
//     //         examInfo = secondRes.data;
//     //     } else {
//     //         examInfo = res.data;
//     //     }

//     //     setDetails(examInfo.data);
//     //     loadingStatus(false);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };

// export default ExamsDetails;