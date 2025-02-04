import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../AuthProvider/UseAuth";
import AxiosSecure from "../AxiosSecure/AxiosSecure";


const AdminUse = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()


    const { data: isAdmin, isLoading: adMinLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-Admin/${user?.email}`)
            // console.log('isAdmin', res.data);
            return res.data?.admin
        }
    })
    return [isAdmin, adMinLoading]


};

export default AdminUse;