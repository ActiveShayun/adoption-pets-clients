import React from 'react';
import AllPets from '../../../../UseHooks/AllPets/AllPets';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import PetsTable from './PetsTable';
import Swal from 'sweetalert2';
import AxiosSecure from '../../../../UseHooks/AxiosSecure/AxiosSecure';
import toast from 'react-hot-toast';

const AllPetsAdmin = () => {
    const [allPets, refetch] = AllPets()
    const axiosSecure = AxiosSecure();

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
        <div>
        <Helmet><title>All Pets</title></Helmet>
        <SectionTitle subheading={'All Pets'} />
    
        {/* Table Wrapper for Responsiveness */}
        <div className="relative overflow-x-auto shadow-md rounded-md">
            <table className="w-full min-w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    {allPets?.map((pet, idx) => (
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
        </div>
    </div>
    
    );
};

export default AllPetsAdmin;