import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import AxiosSecure from '../AxiosSecure/AxiosSecure';
import UseAuth from '../../AuthProvider/UseAuth';
import AxiosPublic from '../AxiosPublic';

const MyAddPets = () => {
    const { user } = UseAuth()
    const axiosPublic = AxiosPublic()
    const axiosSecure = AxiosSecure()
    const [totalPage, setTotalPag] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [count, setCount] = useState(0)


    const numberOfPage = Math.ceil(count / totalPage)
    // console.log('numberOfPage', numberOfPage);

    const page = [...Array(numberOfPage).keys()];
    // console.log('page', page);

    const handleTotalPages = (e) => {
        // console.log(e.target.value);
        const value = parseInt(e.target.value)
        setTotalPag(value)
        setCurrentPage(0)
    }

    const handleNextBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePrevBtn = () => {
        if (currentPage < page.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const { data: myPets = [], refetch, isLoading } = useQuery({
        queryKey: ['myPets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pets?email=${user.email}&totalPage=${currentPage}&currentPage=${totalPage}`)
            console.log('my pets', res.data);
            return res.data
        }

    })

    useEffect(() => {
        refetch()
    }, [currentPage, totalPage])

    useEffect(() => {
        axiosPublic.get('/pets-count')
            .then(res => {
                // console.log('page', res.data.result);
                setCount(res.data.result)
            })

    }, [])

    return [myPets, refetch, isLoading, handleTotalPages, page, totalPage, setCurrentPage, currentPage, handleNextBtn, handlePrevBtn]
}
export default MyAddPets;