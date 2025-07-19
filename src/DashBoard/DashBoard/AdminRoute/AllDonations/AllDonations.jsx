import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import DonationTable from './DonationTable';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import AxiosPublic from '../../../../UseHooks/AxiosPublic';
import Pagination from '../../../../Shared/paginationPage/Pagination';
import { useEffect, useState } from 'react';

const AllDonations = () => {
    const axiosPublic = AxiosPublic()


    const { data: count = [], } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-pagination')
            console.log('count', res?.data);
            return res?.data?.total
        }
    })

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPage = Math.ceil(count / itemsPerPage)
    console.log('numberOfPage', numberOfPage);
    const pages = [...Array(numberOfPage).keys()]
    console.log('pages', pages);

    const handleChancePerPage = (e) => {
        const value = parseInt(e.target.value)
        console.log(value);
        setItemsPerPage(value)
        setCurrentPage(0)
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const { data: allDonation = [], refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-donation?page=${currentPage}&size=${itemsPerPage}`)
            console.log(res.data);
            return res.data
        }
    })

    useEffect(() => {
        refetch()
    }, [currentPage, itemsPerPage])


    // control donation api
    const updateDonationStatusPause = async (id) => {
        const res = await axiosPublic.patch(`/update-donation-control/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Donation Status successful')
            refetch()
        }
    }
    const updateDonationStatusUnPause = async (id) => {
        const res = await axiosPublic.patch(`/update-donation-status/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Donation Status successful')
            refetch()
        }
    }

    const handlePetsDelete = async (id, pateName) => {
        const result = await Swal.fire({
            title: "Do you want to delete pets?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        })
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = await axiosPublic.delete(`/remove-donation/${id}`)
            // console.log('delete', res);
            if (res.data.deletedCount > 0) {
                Swal.fire(`${pateName} is delete successful`, "", "success");
                refetch()
            }
        }
    }

    return (
        <div>
            <Helmet><title>All Donations</title></Helmet>
            {/* <SectionTitle subheading={'All Donation Here'} /> */}

            {/* Table Wrapper for Responsiveness */}
            <div className="overflow-x-auto shadow-md rounded-md min-w-[900px]">
                <table className="w-full text-sm font-semibold text-left border border-yellow-300">
                    {/* Table Head */}
                    <thead>
                        <tr className="border text-sm text-left border-yellow-300  uppercase">
                            <th className="px-2 py-3">ID</th>
                            <th className="px-3 py-3">Donation Owner</th>
                            <th className="px-3 py-3">Pets Name</th>
                            <th className="px-3 py-3">Pets Image</th>
                            <th className="px-3 py-3">Amount</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="px-3 py-3">Delete</th>
                            <th className="px-3 py-3">Edit</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {allDonation.map((donation, idx) => (
                            <DonationTable
                                idx={idx}
                                donation={donation}
                                key={donation._id}
                                updateDonationStatusPause={updateDonationStatusPause}
                                updateDonationStatusUnPause={updateDonationStatusUnPause}
                                handlePetsDelete={handlePetsDelete}
                            />
                        ))}
                    </tbody>
                </table>
                <div className='px-4'>
                    {/* pagination container */}
                    <Pagination
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        handleChancePerPage={handleChancePerPage}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>


    );
};

export default AllDonations;