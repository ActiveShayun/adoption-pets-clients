import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../../UseHooks/AxiosSecure/AxiosSecure";
import { Helmet } from "react-helmet-async";
import UsersTable from "./UsersTable";
import UseAuth from "../../../../AuthProvider/UseAuth";
import toast, { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";
import AxiosPublic from "../../../../UseHooks/AxiosPublic";
import Pagination from "../../../../Shared/paginationPage/Pagination";


const AllUsers = () => {
    const axiosSecure = AxiosSecure()
    const axiosPublic = AxiosPublic()
    const { user } = UseAuth()

    const { data: total = [] } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosPublic.get('https://adoption-pets-server-site.vercel.app/users-pagination')
            console.log(res?.data?.total);
            return res?.data?.total
        }
    })
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPage = Math.ceil(total / itemsPerPage)
    console.log(numberOfPage);
    const pages = [...Array(numberOfPage).keys()]
    console.log(pages);

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

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(res.data);
            return res.data
        }
    })

    useEffect(() => {
        refetch()
    }, [itemsPerPage, currentPage])

    const handleMakeAdmin = async (id) => {
        // console.log('handleMakeAdmin', id);
        const res = await axiosSecure.patch(`/make-admin/${id}`)
        // console.log(res);
        if (res.data.modifiedCount > 0) {
            toast.success('Make Admin SuccessFully Done')
            refetch()
        }
    }


    return (
        <div className="shadow-md rounded-xl w-full">
            <Helmet><title>All Users</title></Helmet>
            <table className="border w-full text-left text-sm font-semibold">
                <thead className="uppercase tex-sm border text-sm">
                    <tr>
                        <th className="px-3 py-3">User ID</th>
                        <th className="px-3 py-3">User Number</th>
                        <th className="px-3 py-3 hidden lg:block">User Email</th>
                        <th className="px-3 py-3">User Photo</th>
                        <th className="px-3 py-3">Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <p className="animate-spin text-3xl text-green-700"><LoaderIcon /></p> :
                        users?.map((user, idx) => (
                            <UsersTable
                                handleMakeAdmin={handleMakeAdmin}
                                key={user._id}
                                user={user}
                                idx={idx}
                            />
                        ))}
                </tbody>
            </table>
            <div className="">
                <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    handleChancePerPage={handleChancePerPage}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage} />
            </div>
        </div>
    );
};

export default AllUsers;