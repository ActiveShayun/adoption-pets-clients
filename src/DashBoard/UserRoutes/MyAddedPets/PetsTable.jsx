import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';


const PetsTable = ({ pet, idx, handlePetsDelete, updateAdoptedStatus, handleUAdoptedStatus }) => {
    const { petsName, petsCategory, petsImg, adopted, _id } = pet
    return (
        <>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {idx + 1}
                </th>
                <td className="lg:px-6 py-2">
                    {petsName}
                </td>
                <td className="lg:px-6 py-2">
                    {petsCategory}
                </td>
                <td className="lg:px-6 py-2">
                    <img className='w-[50px] h-[50px] rounded-full' src={petsImg} alt="" />
                </td>
                <td className="lg:px-6 py-2 text-lg">
                    <Link to={`/editPets/${_id}`}>
                        <FaEdit />
                    </Link>
                </td>
                <td className="lg:px-6 py-4 text-lg">
                    <button onClick={() => handlePetsDelete(_id, petsName)}>
                        <RiDeleteBin2Line />
                    </button>
                </td>
                <td className="lg:px-6 py-4">
                    {
                        adopted === 'Adopted' ?
                            <button
                                onClick={() => handleUAdoptedStatus(_id)}
                                className='text-green-500'>Adopted</button>
                            :
                            <button className='text-red-800'
                                onClick={() => updateAdoptedStatus(_id)}
                            >
                                Not Adopted</button>
                    }
                </td>
            </tr>
        </>
    );
};

export default PetsTable;
