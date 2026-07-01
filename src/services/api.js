import axios from "axios";

 const API = axios.create({
   baseURL: " https://exam-backend-examify.onrender.com/api",
 });



//  const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//  });


 // ✅ ONE clean interceptor only
 API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // console.log("TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
 });

 // ✅ Handle expired token globally
 API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("AUTH ERROR:", {
        status: error.response.status,
        message: error.response.data?.message,
        url: error.config?.url,
        time: new Date().toISOString(),
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
); 

export default API;
