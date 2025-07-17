import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  // No need for `withCredentials` since you are using token-based auth
});

// Attach token from localStorage to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token & redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login"; // or "/auth/login" if that's your login route
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;