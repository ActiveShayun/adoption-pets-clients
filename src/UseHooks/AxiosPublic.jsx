import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'http://localhost:5000',
    withCredentials : true
})

const AxiosPublic = () => {
    return instance;
};

export default AxiosPublic;