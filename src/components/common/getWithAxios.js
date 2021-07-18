// import { useState, useEffect } from 'react';
// import authAxios from "../../lib/http"
// import Cookies from "js-cookie"
// import axios from "axios"

// const getWithAxios = async (url_1, url_2) => {
//     try {
//         const res = await authAxios.get(url_1, { withCredentials: true })
//         let response = []

//         if (!res) {
//             const secondRes = await axios.get(url_2, {
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

// export default getWithAxios
