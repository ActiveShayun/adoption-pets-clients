import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import UseAuth from "../../../AuthProvider/UseAuth";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import Pagination from "../../../Shared/paginationPage/Pagination";
import { useEffect, useState } from "react";

const MyDonationHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = AxiosSecure()
    const [itemsPerPage, setItemsPerPage] = useState(10)
    console.log('itemsPerPage', itemsPerPage);
    console.log(user);
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`)
            console.log(res.data.result);
            return res.data
        }
    })

    const count = payments?.total || 0
    console.log('count', count);

    const totalDonation = payments?.result?.reduce((total, item) => total + item.price, 0)
    console.log(totalDonation);
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPage = Math.ceil(count / itemsPerPage)
    console.log(numberOfPage);
    const pages = [...Array(numberOfPage).keys()]
    console.log(pages);


    useEffect(() => {
        refetch()
    }, [currentPage, itemsPerPage])

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

    return (
            <div className='mt-5 '>
                   <Helmet><title>My Donations</title></Helmet>
                <div class="max-w-full overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full min-w-[720px] overflow-x-auto text-sm text-left border">
                        <thead class="text-sm uppercase border">
                            <tr>
                                <th scope="col" class="px-4 py-3">
                                    Donner Name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Donner Image
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Donated amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments?.result?.map(donation => <tr key={donation._id}
                                    class="">
                                    <th scope="row" className="border px-4 py-3 font-medium">
                                        {user?.displayName}
                                    </th>
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className='w-[50px] h-[50px] rounded-full'
                                            src={user?.photoURL} alt="" />
                                    </th>
                                    <td className="px-4 py-3">
                                        {donation.status}
                                    </td>
                                    <td className="px-4 py-3">
                                        {donation.price}
                                    </td>

                                </tr>)
                            }
                        </tbody>

                    </table>
                    <p className=" text-right font-semibold">
                        Total Donation = $ ( {totalDonation} )
                    </p>
                </div>
                {/* pagination container */}
                <div>
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
    );
};

export default MyDonationHistory;