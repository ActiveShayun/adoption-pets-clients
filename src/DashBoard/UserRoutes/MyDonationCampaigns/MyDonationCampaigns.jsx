import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../AuthProvider/UseAuth';
import toast from 'react-hot-toast';
import Table from './Table';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '../../../Shared/paginationPage/Pagination';


const MyDonationCampaigns = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()
    console.log(user);

    const { data: count = [], } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-pagination/${user?.email}`)
            console.log('pagination count', res?.data?.result);
            return res?.data?.result
        }
    })
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPage = Math.ceil(count / itemsPerPage)
    console.log(numberOfPage);
    const pages = [...Array(numberOfPage).keys()]
    console.log(pages);

    const handleChancePerPage = (e) => {
        const value = parseInt(e.target.value)
        setItemsPerPage(value)
        console.log(itemsPerPage);
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages?.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    const { data: myDonation = [], refetch } = useQuery({
        queryKey: ['donation', user?.email, currentPage, itemsPerPage],

        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`)
            console.log(res.data);
            return res.data
        }
    })


    useEffect(() => {
        refetch()
    }, [currentPage, itemsPerPage])

    // control donation api
    const updateDonationStatusPause = async (id) => {
        const res = await axiosSecure.patch(`/update-donation-control/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Donation Status successful')
            refetch()
        }
    }
    const updateDonationStatusUnPause = async (id) => {
        const res = await axiosSecure.patch(`/update-donation-status/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Donation Status successful')
            refetch()
        }
    }


    return (
        <div>
            <div className="">
                <Helmet><title>My Donations</title></Helmet>
                <SectionTitle subheading={'Your All Donations Campaigns'} />

                <div className="mt-4">
                    {/* Table Wrapper for Responsiveness */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="text-xs uppercase border border-yellow-300">
                                <tr>
                                    <th scope="col" className="px-4 py-2">Pet name</th>
                                    <th scope="col" className="px-4 py-2">Max Donation</th>
                                    <th scope="col" className="px-4 py-2">
                                        <button>Donation Control</button>
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        <button>View Donators</button>
                                    </th>
                                    <th scope="col" className="px-4 py-2  sm:table-cell">Edit</th>
                                    <th scope="col" className="px-4 py-2 hidden lg:block ">Pets Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myDonation?.map(donation => (
                                    <Table
                                        donation={donation}
                                        key={donation._id}
                                        updateDonationStatusPause={updateDonationStatusPause}
                                        updateDonationStatusUnPause={updateDonationStatusUnPause}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {/* pagination  container */}
                        <div className="">
                            <Pagination
                                pages={pages}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                setCurrentPage={setCurrentPage}
                                handleChancePerPage={handleChancePerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default MyDonationCampaigns;