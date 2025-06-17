import Swal from "sweetalert2";
import AxiosSecure from "../../../UseHooks/AxiosSecure/AxiosSecure";
import MyAddPets from "../../../UseHooks/myAddedPets/MyAddPets";
import PetsTable from "./PetsTable";
import toast from "react-hot-toast";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";


const MyAddedPets = () => {
    const [myPets, refetch, isLoading, handleTotalPages, page, totalPage, setCurrentPage, currentPage, handleNextBtn, handlePrevBtn] = MyAddPets()
    // console.log('myPets', myPets);
    const axiosSecure = AxiosSecure()

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
    // update adopted 
    const updateAdoptedStatus = async (id) => {
        // console.log(id);
        try {
            const res = await axiosSecure.patch(`/adopted-status-chance/${id}`)
            // console.log('update status', res);
            if (res.data.modifiedCount > 0) {
                refetch()
                toast.success('Adopted Status Updated Done')
            }
        } catch (err) {
            toast.error(err.message)
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
            <div className="mt-10 text-center max-w-screen-xl relative shadow-md sm:rounded-lg overflow-x-auto overflow-hidden">
                {/* Table Wrapper for Responsiveness */}
                <SectionTitle subheading={'Your'} heading={'Added All Pets'} />

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">Serial Number</th>
                            <th scope="col"
                                className=" py-3">Pet name</th>
                            <th scope="col"
                                className="py-3">Pet category</th>
                            <th scope="col" className="px-3 py-3">Pet image</th>
                            <th scope="col" className="px-3 py-3 md:table-cell">Update</th>
                            <th scope="col" className="px-3 py-3 md:table-cell">Delete</th>
                            <th scope="col" className="px-3 py-3">Adopted Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPets?.map((pet, idx) => (
                            <PetsTable
                                key={pet._id}
                                pet={pet}
                                idx={idx}
                                handlePetsDelete={handlePetsDelete}
                                updateAdoptedStatus={updateAdoptedStatus}
                                handleUAdoptedStatus={handleUAdoptedStatus}
                            />
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex flex-wrap gap-3 mt-10 justify-center items-center">
                <button onClick={handleNextBtn} className='px-4 bg-slate-300 rounded-lg'>Next</button>
                {page.map(p => (
                    <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`bg-gray-500 text-white px-3 rounded-xl ${currentPage === p ? 'bg-yellow-600' : ''}`}
                    >
                        {p}
                    </button>
                ))}
                <select defaultValue={totalPage} onChange={handleTotalPages} className="px-3 py-1 border rounded">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
                <button onClick={handlePrevBtn} className='px-3 bg-slate-300 rounded-lg'>Prev</button>
            </div>
        </div>

    );
};

export default MyAddedPets;