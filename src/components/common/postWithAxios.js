// import { useState, useEffect } from 'react';
// import authAxios from "../../lib/http"
// import Cookies from "js-cookie"
// import axios from "axios"

// const postWithAxios = (url_1, url_2, data) => {
//     try {
//         const res = await authAxios.post(url_1, data, { withCredentials: true })
//         let response = []

//         if (!res) {
//             const secondRes = await axios.post(url_2, data, {
//                 headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
//                 withCredentials: true,
//             })
//             response = secondRes
//         } else {
//             response = res
//         }
//         return response;

//     } catch (error) {
//         return error.response;
//     }
// }

// export default postWithAxios
