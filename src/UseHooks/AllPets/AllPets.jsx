import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../AxiosSecure/AxiosSecure";
import { useEffect, useState } from "react";


const AllPets = () => {
    const axiosSecure = AxiosSecure()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("")


    const { data: allPets = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/AllPets?search=${search}&category=${category}`)
            console.log('apppets', res.data);
            return res.data
        }
    })
    useEffect(() => {
        refetch()
    }, [search, category, refetch])
    return [allPets, refetch, loading, search, setSearch, category, setCategory]
};

export default AllPets;