import Swal from "sweetalert2";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import PetsTable from "./PetsTable";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../AuthProvider/UseAuth";
import { useState } from "react";
import Pagination from "../../../Shared/paginationPage/Pagination";



const MyAddedPets = () => {
    const { user } = UseAuth()
    console.log(user.email);
    const axiosSecure = AxiosSecure()



    const { data: count = [] } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets-pagination`)
            console.log('my pets', res);
            return res?.data?.result
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

    const { data: myPets = [], refetch, isLoading } = useQuery({
        queryKey: ['myPets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pets?email=${user?.email}`)
            console.log('my pets', res.data);
            return res.data
        }
    })


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
    // update adopted 
    const updateAdoptedStatus = async (id) => {
        // console.log(id);
        try {
            const res = await axiosSecure.patch(`/adopted-status-chance/${id}`)
            // console.log('update status', res);
            if (res.data.modifiedCount > 0) {
                refetch()
                toast.success('Adopted Status Updated Done')
            }
        } catch (err) {
            toast.error(err.message)
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
        <div>
            <div className="text-center max-w-screen-xl relative shadow-md sm:rounded-lg overflow-x-auto overflow-hidden">
                {/* Table Wrapper for Responsiveness */}
                <table className="min-w-[720px] overflow-x-auto w-full text-sm text-left rtl:text-right">
                    <thead className=" font-semibold uppercase border">
                        <tr>
                            <th scope="col" className="px-3 py-3">Serial Number</th>
                            <th scope="col"
                                className=" py-3">Pet name</th>
                            <th scope="col"
                                className="py-3">Pet category</th>
                            <th scope="col" className="px-3 py-3">Pet image</th>
                            <th scope="col" className="px-3 py-3 md:table-cell">Update</th>
                            <th scope="col" className="px-3 py-3 md:table-cell">Delete</th>
                            <th scope="col" className="px-3 py-3">Adopted Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPets?.map((pet, idx) => (
                            <PetsTable
                                key={pet._id}
                                pet={pet}
                                idx={idx}
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

        </div>

    );
};

export default MyAddedPets;