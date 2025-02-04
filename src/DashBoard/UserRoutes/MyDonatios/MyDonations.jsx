import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import UseAuth from '../../../AuthProvider/UseAuth';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const MyDonations = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()

    const { data: myDonations = [], isLoading } = useQuery({
        queryKey: ['myDonations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donations/${user?.email}`)
            // console.log('myDonations', res.data);
            return res.data
        }

    })
    return (
        <div className='pt-10'>
            <Helmet><title>My Donations</title></Helmet>
            <SectionTitle subheading={'Your All Donations'} />
            <div className='mt-5'>
                {
                    isLoading && <p className='text-center'>Loading</p>
                }
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                   Donner Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pet Image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pet name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Donated amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myDonations?.map(donation => <tr key={donation._id}
                                    class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                       {donation.donnerName}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className='w-[50px] h-[50px] rounded-full'
                                        src={donation.petsImage} alt="" />
                                    </th>
                                    <td class="px-6 py-4">
                                        {donation.petsName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {donation.donationAmount}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyDonations;