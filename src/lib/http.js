import axios from "axios"

// import Cookies from "js-cookie"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
})
// console.log(localStorage.getItem("accessToken"))

//Add a response interceptor

authAxios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      originalRequest.url === "users/refreshToken"
    ) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = Cookies.get("refreshToken")
      console.log(refreshToken)
      return axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/refreshToken`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            return Promise.resolve()
          }
        })
    }
    return Promise.reject(error)
  }
)

export default authAxios
