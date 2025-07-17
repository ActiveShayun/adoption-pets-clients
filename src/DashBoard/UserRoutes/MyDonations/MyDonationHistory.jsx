import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import UseAuth from "../../../AuthProvider/UseAuth";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";

const MyDonationHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = AxiosSecure()
    console.log(user);

    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })

    return (
        <div>
            <Helmet><title>My Donations</title></Helmet>
            <SectionTitle subheading={'Your Donations History'} />
            <div className='mt-5'>
                {/* {
                    isLoading && <p className='text-center'>Loading</p>
                } */}
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Donner Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Donner Image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Donated amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments?.map(donation => <tr key={donation._id}
                                    class="">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.displayName}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className='w-[50px] h-[50px] rounded-full'
                                            src={user?.photoURL} alt="" />
                                    </th>
                                    <td class="px-6 py-4">
                                        {donation.status}
                                    </td>
                                    <td class="px-6 py-4">
                                          {donation.price}
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

export default MyDonationHistory;