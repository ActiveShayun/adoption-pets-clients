import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://adoption-pets-server-site-quxu36g77-apu-roys-projects.vercel.app',
    baseURL: 'https://adoption-pets-server-site-quxu36g77-apu-roys-projects.vercel.app',
})

const AxiosPublic = () => {
    return instance;
};

export default AxiosPublic;