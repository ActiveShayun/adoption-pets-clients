import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import UseAuth from "../../../AuthProvider/UseAuth";


const Cards = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()

    const { data: myDonations = [], isLoading, refetch } = useQuery({
        queryKey: ['myDonations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donations/${user?.email}`)
            console.log('myDonations', res.data);
            return res.data
        }

    })
    return { myDonations, isLoading, refetch }
};

export default Cards;