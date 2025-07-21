import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import UseAuth from "../../../AuthProvider/UseAuth";
import { act, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";


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
            if (res.data.modifiedCount > 0) {
                refetch()
                toast.success('Adopted Status Updated Done')
            }
        } catch (err) {
            toast.error(err.message)
            console.log(err);
        }
    }
    const handleUnAdoptedStatus = async (id) => {
        console.log(id);
        try {
            const res = await axiosSecure.patch(`/unAdopted-request/${id}`)
            console.log('update status', res);
            if (res.data.modifiedCount > 0) {
                refetch()
                toast.success('Adopted Status Updated Done')
            }
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
        <div class="max-w-full overflow-x-auto shadow-md sm:rounded-lg">
            <Helmet><title>Adoption Request</title></Helmet>
            <table className="w-full min-w-[720px] text-sm text-left rtl:text-right border">
                <thead class="text-xs  uppercase border">
                    <tr className="border">
                        <th scope="col" class="px-2 py-2">
                            Name
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
                            className=" border-b ">
                            <td className="px-2 py-2
                                font-medium   
                                 whitespace-nowrap
                                ">
                                {request.userName}
                            </td>
                            <td className="px-2 py-2">
                                {request.phoneNumber}
                            </td>
                            <td className="px-2 py-2">
                                {request.location}
                            </td>
                            <td className="px-2 py-2">
                                <img className="w-[40px] h-[40px] rounded-full" src={request.petsImg} alt="" />
                            </td>
                            <td className="px-2 py-2 ">
                                {request.petsName}
                            </td>
                            <td className="px-2 py-2">
                                <div className="flex gap-2">
                                    <>
                                        {
                                            request.adopted === 'Adopted' ?
                                                <button onClick={() => handleUnAdoptedStatus(request._id,)}
                                                    className="text-green-600">
                                                    Un Adopted</button> :
                                                <button onClick={() => updateAdoptedStatus(request._id,)}
                                                >Adopted</button>
                                        }
                                    </>
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
    );
};

export default AdoptionRequest;