import React, { useEffect, useState } from 'react';
import AllPets from '../../../../UseHooks/AllPets/AllPets';
import { Helmet } from 'react-helmet-async';
import PetsTable from './PetsTable';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../../../UseHooks/AxiosPublic';
import Pagination from '../../../../Shared/paginationPage/Pagination';
import AxiosSecure from '../../../../UseHooks/AxiosSecure/AxiosSecure';


const AllPetsAdmin = () => {
    const { allPets, refetch } = AllPets()
    const axiosPublic = AxiosPublic()
    const axiosSecure = AxiosSecure()

    const { data: count = [] } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosPublic.get('http://localhost:5000/allPets-pagination')
            console.log('count', res?.data?.total);
            return res?.data?.total
        }
    })
    console.log('count', count);
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

    const { data: pets = [], refetch: refetchAllPets } = useQuery({
        queryKey: ['pets', currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`http://localhost:5000/admin-allPets?page=${currentPage}&size=${itemsPerPage}`)
            console.log('pets', data);
            return data
        }
    })


    console.log('all pets', pets);

    const handlePetsDelete = async (id, pateName) => {
        const result = await Swal.fire({
            title: "Do you want to delete pets?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        })
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/myAddedPets/${id}`)
            // console.log('delete', res);
            if (res.data.deletedCount > 0) {
                Swal.fire(`${pateName} is delete successful`, "", "success");
                refetch()
            }
        }
    }

    const updateAdoptedStatus = async (id) => {
        const res = await axiosSecure.patch(`/adopted-status-chance/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Updated Adoption Status Successful')
            refetch()
        }
    }

    // cancel adopted status
    const handleUAdoptedStatus = async (id) => {
        const res = await axiosSecure.patch(`/adopted-request-cancel/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Updated Adoption Status Successful')
            refetch()
        }
    }
    return (
        <div className="max-w-full overflow-x-auto shadow-md rounded-md">
            <Helmet><title>All Pets</title></Helmet>
            <table className="min-w-[700px] w-full overflow-x-auto  text-sm font-semibold text-left border">
                <thead className="text-sm text-left uppercase border">
                    <tr>
                        <th scope="col" className="px-3 py-3">Serial Number</th>
                        <th scope="col" className="px-3 py-3">Pet name</th>
                        <th scope="col" className="px-3 py-3">Pet category</th>
                        <th scope="col" className="px-3 py-3">Pet image</th>
                        <th scope="col" className="px-3 py-3">Update</th>
                        <th scope="col" className="px-3 py-3">Delete</th>
                        <th scope="col" className="px-3 py-3">Adopted Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pets?.map((pet, idx) => (
                        <PetsTable
                            idx={idx}
                            pet={pet}
                            key={pet._id}
                            handlePetsDelete={handlePetsDelete}
                            updateAdoptedStatus={updateAdoptedStatus}
                            handleUAdoptedStatus={handleUAdoptedStatus}
                        />
                    ))}
                </tbody>
            </table>
            <div className=''>
                {/* paginaTION container */}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    handleChancePerPage={handleChancePerPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    pages={pages}
                />
            </div>
        </div>
    );
};

export default AllPetsAdmin;