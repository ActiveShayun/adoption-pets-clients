import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AxiosPublic from "../AxiosPublic";
import { useDebounce } from 'use-debounce';
import { getAllPets } from "../getAllPets/getAllPets";

const AllPets = () => {
    const axiosPublic = AxiosPublic()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("")
    const [showSpinner, setShowSpinner] = useState(true);
    const [debounceSearch] = useDebounce(search, 500)
    const [debounceCategory] = useDebounce(category, 500)
    const [debounceSort] = useDebounce(sort, 500)
    console.log('sort', sort);


    const {
        data,
        refetch, isLoading: loading,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['pets', debounceSearch, debounceCategory, debounceSort],
        queryFn: ({ pageParam = 1 }) =>
            getAllPets(debounceSearch, debounceCategory, debounceSort, pageParam),
        getNextPageParam: (lastPages, allPages) => {
            console.log('lastPages', lastPages, 'allPages', allPages);
            return lastPages?.length === 10 ? allPages?.length + 1 : undefined
        }


    })

    // step two
    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 1;

        if (bottom && hasNextPage) {
            fetchNextPage()
        }
    }

    console.log('useInfiniteQuery data', data);
    // step one
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [hasNextPage])



    // data show dele
    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShowSpinner(true), 500);
        } else {
            clearTimeout(timer);
            setShowSpinner(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);
    console.log('data ', data);


    return { data, loading, search, setSearch, category, setCategory, setSort, sort, refetch, showSpinner, fetchNextPage, hasNextPage, isFetchingNextPage }
};

export default AllPets;