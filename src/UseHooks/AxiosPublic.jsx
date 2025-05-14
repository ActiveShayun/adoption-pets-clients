import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://adoption-pets-server-site.vercel.app',
    baseURL: 'https://adoption-pets-server-site.vercel.app',
    withCredentials : true
})

const AxiosPublic = () => {
    return instance;
};

export default AxiosPublic;