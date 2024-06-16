import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://b9a12-assignment-project.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
