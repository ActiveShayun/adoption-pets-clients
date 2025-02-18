import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../../UseHooks/AxiosSecure/AxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import UsersTable from "./UsersTable";
import UseAuth from "../../../../AuthProvider/UseAuth";
import toast from "react-hot-toast";


const AllUsers = () => {
    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users')
            // console.log(res.data);
            return res.data
        }


    })


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
        <div className="mt-10 relative shadow-md rounded-xl w-full">
            <Helmet><title>All Users</title></Helmet>
            <SectionTitle subheading={'That"s Users Visit This Website'} heading={'All Users'} />
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">User ID</th>
                        <th scope="col" className="px-4 py-3">User Number</th>
                        <th scope="col" className="px-4 py-3 hidden lg:block">User Email</th>
                        <th scope="col" className="px-4 py-3">User Photo</th>
                        <th scope="col" className="px-4 py-3">Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, idx) => (
                        <UsersTable
                            handleMakeAdmin={handleMakeAdmin}
                            key={user._id}
                            user={user}
                            idx={idx}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;