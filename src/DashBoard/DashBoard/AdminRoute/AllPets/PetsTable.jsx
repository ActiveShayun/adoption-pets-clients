import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';

import { Link } from 'react-router-dom';

const PetsTable = ({ pet, idx, handlePetsDelete, updateAdoptedStatus, handleUAdoptedStatus }) => {
    // console.log(pet);
    return (
        <>
            <tr class="border-b dark:border-gray-700">
                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {idx + 1}
                </th>
                <td class="px-6 py-2">
                    {pet?.petsName}
                </td>
                <td class="px-6 py-2">
                    {pet?.petsCategory}
                </td>
                <td class="px-6 py-2">
                    <img className='w-[50px] h-[50px] rounded-full' src={pet?.petsImg} alt="" />
                </td>
                <td class="px-6 py-2 text-lg text-green-500">
                    <Link to={`/dashBoard/updatePets/${pet._id}`}>
                        <FaEdit />
                    </Link>
                </td>
                <td class="px-6 py-4 text-lg ">
                    <button onClick={() => handlePetsDelete(pet._id, pet.petsName)}
                        className='text-red-500'
                    >
                        <RiDeleteBin2Line />
                    </button>
                </td>
                <td class="px-6 py-4">
                    {
                        pet.adopted === 'Adopted' ?
                            <button
                                onClick={() => handleUAdoptedStatus(pet._id)}

                                className='text-red-600'
                            >
                                Un Adopted</button> :
                            <button className='text-green-600'
                                onClick={() => updateAdoptedStatus(pet._id)}
                            > Adopted</button>
                    }
                </td>

            </tr>
        </>
    );
};

export default PetsTable;

adopted
:
"Adopted"
deadline
:
"2025-01-26T09:50:58.975Z"
description
:
"ggfdfdfdgd"
email
:
"mrapuroy1609@gmail.com"
location
:
"Dakha"
petsAge
:
"4"
petsCategory
:
"cat"
petsImg
:
"https://i.ibb.co.com/rFtG8PM/slide3.jpg"
petsName
:
"cuty"
phoneNumber
:
"66454565466"
sortDescription
:
"dfgdfgdfgddf"
_id
:
"6796062570f1344d53f1e129"