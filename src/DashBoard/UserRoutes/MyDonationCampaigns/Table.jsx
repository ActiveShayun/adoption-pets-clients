import React, { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import ViewDonators from './ViewDonators';


const Table = ({ donation, updateDonationStatusPause, updateDonationStatusUnPause }) => {
    const axiosSecure = AxiosSecure()
    const [viewDonators, setViewDonators] = useState([]);
    // console.log(viewDonators);
    const totalPrise = viewDonators.reduce((total, items) => total + items.donationAmount, 0)
    // console.log(totalPrise);
    const prise = Math.round(totalPrise)
    // console.log(prise);
    const modalRef = useRef(null)


    const handleShowDonators = async (id) => {
        // console.log('handleShowDonators', id);
        const { data } = await axiosSecure.get(`/viewDonators/${id}`)
        // console.log(data);
        setViewDonators(data)
    }

    return (
        <>
            <tr class=" border border-yellow-300 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 text-black">
                <th scope="row"
                    class="px-6 py-4 border border-yellow-300 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {donation.petsName}
                </th>
                <td
                    class="px-6 py-4 border border-yellow-300 ">
                    $ {donation.amount}
                </td>
                <td
                    class="px-6 py-4 border border-yellow-300 ">
                    {donation.Pause === 'Pause' ?
                        <button
                            onClick={() => updateDonationStatusUnPause(donation._id)}
                        >UnPause</button>
                        :
                        <button
                            onClick={() => updateDonationStatusPause(donation._id)}
                        >Pause</button>
                    }
                </td>
                <td
                    class="px-6 py-4 border border-yellow-300 ">
                    <button >
                        <button onClick={() => { handleShowDonators(donation._id); modalRef.current.showModal() }}
                        >View Donators</button>
                    </button>

                </td>
                <td
                    class="px-6 py-4 text-right border border-yellow-300 ">
                    <Link
                        to={`/dashBoard/dashBoard/donation/${donation._id}`}>
                        <button><FaEdit /></button>
                    </Link>
                </td>
                <td class="px-6 py-4 text-right hidden lg:block">
                    <img className='w-[50px] h-[50px] rounded-full'
                        src={donation.petsImage} alt="" />
                </td>
            </tr>
            <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="overflow-x-auto">
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Donators Name</th>
                                                <th>Donated Amount</th>
                                                <th>Pest Name</th>
                                                <th>Pest Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                viewDonators?.map((donators, idx) =>
                                                    <ViewDonators
                                                        idx={idx}
                                                        donators={donators}
                                                        key={donators._id}
                                                    />)
                                            }
                                        </tbody>
                                    </table>
                                </div>



                            </div>
                            <div className='flex items-center justify-between'>
                                <button
                                    className='bg-red-700 mt-2 flex items-center justify-center w-3 h-3 rounded-full p-3 text-white'>
                                    X</button>
                                     <p className='text-lg'>Total Donation collect {prise} $</p>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Table;