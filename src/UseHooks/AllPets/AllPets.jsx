import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AxiosPublic from "../AxiosPublic";


const AllPets = () => {
    const axiosPublic = AxiosPublic()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("")
    console.log('sort', sort);


    const { data: allPets = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['pets', sort, search, category],
        queryFn: async () => {
            const res = await axiosPublic.get(`/AllPets?search=${search}&category=${category}&sort=${sort}`)
            console.log('all pets', res.data);
            return res.data
        }
    })


    return { allPets, loading, search, setSearch, category, setCategory, setSort, sort, refetch }
};

export default AllPets;