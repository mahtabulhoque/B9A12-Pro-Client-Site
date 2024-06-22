import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://b9a12-assignment-project.vercel.app"
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
