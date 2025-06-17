import axios from "axios";
import UseAuth from "../../AuthProvider/UseAuth";



const instance = axios.create({
    baseURL: 'https://adoption-pets-server-site.vercel.app',
    // baseURL: 'https://adoption-pets-server-site.vercel.app'
})
const AxiosSecure = () => {
    return instance;
};

export default AxiosSecure;