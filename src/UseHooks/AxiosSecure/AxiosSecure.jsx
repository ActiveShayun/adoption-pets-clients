import axios from "axios";
import UseAuth from "../../AuthProvider/UseAuth";
import { useNavigate } from "react-router-dom";



const instance = axios.create({
    baseURL: 'https://adoption-pets-server-site.vercel.app',
    // baseURL: 'https://adoption-pets-server-site.vercel.app'
    withCredentials: true

})
const AxiosSecure = () => {
    const { handleSignOut } = UseAuth()


    // request interceptor to add authorization header for every secure call to teh api
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    // instance.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {
    //     const status = error.response?.status;
    //     // console.log('status error in the interceptor', status);
    //     // for 401 or 403 logout the user and move the user to the login
    //     if (status === 401 || status === 403) {
    //         await logOut();
    //         navigate('/login');
    //     }
    //     return Promise.reject(error);
    // })


    return instance;

};

export default AxiosSecure;