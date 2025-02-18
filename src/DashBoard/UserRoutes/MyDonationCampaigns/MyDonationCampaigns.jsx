import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../AuthProvider/UseAuth';
import toast from 'react-hot-toast';
import Table from './Table';

const MyDonationCampaigns = () => {
    const axiosSecure = AxiosSecure()
    const { user, handleShowDonators } = UseAuth()

    const { data: myDonation = [], refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation/${user?.email}`)
            // console.log(res.data);
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


    return (
        <div>
            <div className="pt-10">
                <Helmet><title>My Donations</title></Helmet>
                <SectionTitle subheading={'Your All Donations Campaigns'} />

                <div className="mt-4">
                    {/* Table Wrapper for Responsiveness */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Pet name</th>
                                    <th scope="col" className="px-4 py-3">Max Donation</th>
                                    <th scope="col" className="px-4 py-3">
                                        <button>Donation Control</button>
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        <button>View Donators</button>
                                    </th>
                                    <th scope="col" className="px-4 py-3  sm:table-cell">Edit</th>
                                    <th scope="col" className="px-4 py-3 hidden lg:block ">Pets Image</th>
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
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyDonationCampaigns;