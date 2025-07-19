import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import UseAuth from "../../AuthProvider/UseAuth";



const axiosInstance = axios.create({
    baseURL: 'https://adoption-pets-server-site-quxu36g77-apu-roys-projects.vercel.app',
    withCredentials: true
})
const AxiosSecure = () => {
    const { handleSignOut } = UseAuth()
    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('axios interceptor caught error', error);
            console.log('error.status',error.status);

            if (error?.status === 401 || error?.status === 400) {
                console.log('need to logout', error.status);
                handleSignOut()
                    .then(() => {
                        toast.success('Logout user')
                    })
                    .catch(err => {
                        toast.error(err.message)
                    })
            }

            return Promise.reject(error)
        })

    }, [])

    return axiosInstance;
};

export default AxiosSecure;