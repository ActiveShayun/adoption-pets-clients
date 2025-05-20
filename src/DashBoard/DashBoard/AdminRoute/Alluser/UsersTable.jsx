import React from 'react';

const UsersTable = ({ user, idx, handleMakeAdmin }) => {
    return (
        <>
            <tr class="border ">
                <th scope="row" class="px-3 font-medium text-gray-900 whitespace-nowrap">
                    {idx + 1}
                </th>
                <td class="px-6">
                    {user.name}
                </td>
                <td class="px-6  flex items-center lg:block relative top-4">
                    <p className='flex items-center'> {user.email}</p>
                </td>
                <td class="px-6 ">
                    <img className='w-[50px] h-[50px] rounded-full' src={user.
                        userPhoto} alt="" />
                </td>
                <td class="px-6 ">
                    {
                        user.role ?
                            <p className='text-green-500'>Admin</p> :
                            <button onClick={() => handleMakeAdmin(user._id)}
                            >User</button>
                    }
                </td>


            </tr>
        </>
    );
};

export default UsersTable;