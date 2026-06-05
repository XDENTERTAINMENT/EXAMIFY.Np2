import axios from "axios";

// const API = axios.create({
//   baseURL: " https://exam-backend-examify.onrender.com/api",
// });



const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ✅ ONE clean interceptor only
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // console.log("TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
