import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';


const PetsTable = ({ pet, idx, handlePetsDelete, updateAdoptedStatus, handleUAdoptedStatus }) => {
    const { petsName, petsCategory, petsImg, adopted, _id } = pet
    return (
        <>
            <tr className="border">
                <th scope="row" class="px-3 py-3 font-medium whitespace-nowrap ">
                    {idx + 1}
                </th>
                <td className="py-2 px-3">
                    {petsName}
                </td>
                <td className="py-2 px-3">
                    {petsCategory}
                </td>
                <td className="px-3 py-3">
                    <img className='w-[50px] h-[50px] rounded-full' src={petsImg} alt="" />
                </td>
                <td className="px-3 py-2 text-lg">
                    <Link to={`/dashBoard/dashBoard/editPets/${_id}`}>
                        <FaEdit />
                    </Link>
                </td>
                <td className="px-3 py-3 text-lg">
                    <button onClick={() => handlePetsDelete(_id, petsName)}>
                        <RiDeleteBin2Line />
                    </button>
                </td>
                <td className="px-3 py-3">
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
