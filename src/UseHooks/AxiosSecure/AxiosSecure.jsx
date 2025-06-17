import axios from "axios";
import UseAuth from "../../AuthProvider/UseAuth";



const instance = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'http://localhost:5000'
})
const AxiosSecure = () => {
    return instance;
};

export default AxiosSecure;