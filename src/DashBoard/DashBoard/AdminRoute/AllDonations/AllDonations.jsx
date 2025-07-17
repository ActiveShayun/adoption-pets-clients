import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSecure from '../../../../UseHooks/AxiosSecure/AxiosSecure';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import Donation from '../../../../Pages/Donation/Donation';
import DonationTable from './DonationTable';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllDonations = () => {
    const axiosSecure = AxiosSecure()

    const { data: allDonation = [], refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-donation')
            console.log(res.data);
            return res.data
        }

    })

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

    const handlePetsDelete = async (id, pateName) => {
        const result = await Swal.fire({
            title: "Do you want to delete pets?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        })
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/remove-donation/${id}`)
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
        <div className="relative overflow-x-auto shadow-md rounded-md min-w-[900px]">
            <table className="w-full text-sm text-left border border-yellow-300">
                {/* Table Head */}
                <thead>
                    <tr className="border border-yellow-300  text-xs uppercase">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Donation Owner</th>
                        <th className="px-3 py-2">Pets Name</th>
                        <th className="px-3 py-2">Pets Image</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Delete</th>
                        <th className="px-3 py-2">Edit</th>
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
        </div>
    </div>
    

    );
};

export default AllDonations;