import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://b9a12-assignment-project.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;