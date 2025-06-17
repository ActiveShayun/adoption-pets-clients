import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import UseAuth from "../../../AuthProvider/UseAuth";
import { act, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";


const AdoptionRequest = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()

    const { data: adoptionRequest = [], refetch } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptionRequest?email=${user?.email}`)
            console.log('adoptionRequest', res.data);
            return res.data
        }
    })


    // update adopted 
    const updateAdoptedStatus = async (id) => {
        try {
            const res = await axiosSecure.patch(`/accepts-adopted-request/${id}`)
            console.log('update status', res);
            // if (res.data.result.modifiedCount > 0) {
            //     refetch()
            //     toast.success('Adopted Status Updated Done')
            // }
        } catch (err) {
            toast.error(err.message)
            console.log(err);
        }
    }

    // reject adoption request
    const rejectAdoptionRequest = async (id) => {
        // console.log('rejectAdoptionRequest', id);
        const res = await axiosSecure.delete(`/rejectAdoptionRequest/${id}`)
        // console.log(res);
        if (res.data.deletedCount > 0) {
            toast.success('Reject Adoption Request')
            refetch()
        }
    }


    return (
        <div className="py-10">
            <Helmet><title>Adoption Request</title></Helmet>
            <SectionTitle subheading={'Your'} heading={'Adoption request'} />
            <div class="relative shadow-md sm:rounded-lg">
                <table class="w-full  w-11/23 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-2 py-2">
                                Name
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Email
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Phone Number
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Location
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Pet image
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Pet Name
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Adoption Request
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adoptionRequest.map(request => <tr key={request._Id}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-2 py-4 font-medium hidden lg:block text-gray-900 whitespace-nowrap dark:text-white">
                                    {request.userName}
                                </th>
                                <td class="px-2 py-4">
                                    {request.email}
                                </td>
                                <td class="px-2 py-4">
                                    {request.phoneNumber}
                                </td>
                                <td class="px-2 py-4">
                                    {request.location}
                                </td>
                                <td class="px-2 py-4 ">
                                    <img className="w-[40px] h-[40px] rounded-full" src={request.petsImg} alt="" />
                                </td>
                                <td class="px-2 py-4 ">
                                    {request.petsName}
                                </td>
                                <td class="px-2 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateAdoptedStatus(request._id,)}
                                        >
                                            {
                                                request.adopted === 'Adopted' ?
                                                    <p className="text-green-600">
                                                        Adopted</p> :
                                                    <p>Not Adopted</p>
                                            }
                                        </button>
                                        <button
                                            onClick={() => rejectAdoptionRequest(request._id)}
                                        >Reject</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdoptionRequest;