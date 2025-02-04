import React from 'react';
import UseAuth from '../../../../AuthProvider/UseAuth';
import { Link, Links } from 'react-router-dom';

const DonationTable = ({ donation, idx, updateDonationStatusPause, updateDonationStatusUnPause, handlePetsDelete }) => {

    const { user } = UseAuth()

    return (
        <>
            <tr className='border border-yellow-300'>
                <th>
                    {idx + 1}
                </th>
                <td className='border border-yellow-300'>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={user?.photoURL}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{user?.displayName}</div>

                        </div>
                    </div>
                </td>
                <td className='border border-yellow-300'>
                    {donation.petsName}
                </td>
                <th className='border border-yellow-300'>
                    <img className='w-[50px] h-[50px] rounded-full' src={donation.petsImage} alt="" />
                </th>
                <th className='border border-yellow-300'>
                    {donation.amount} $
                </th>
                <th className='border border-yellow-300'>
                    {
                        donation.Pause === 'Pause' ?
                            <button
                                onClick={() => updateDonationStatusUnPause(donation._id)}
                            >Pause</button> :
                            <button
                                onClick={() => updateDonationStatusPause(donation._id)}
                            >UnPause</button>

                    }
                </th>
                <th>
                    <button onClick={() => handlePetsDelete(donation._id, donation.petsName)}>Delete</button>
                </th>
                <th>
                    <Link to={`/dashBoard/editDonation/${donation._id}`}>
                        <button>Edit</button>
                    </Link>
                </th>
            </tr>
        </>
    );
};

export default DonationTable;