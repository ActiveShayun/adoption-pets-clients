import React from 'react';

const UsersTable = ({ user, idx, handleMakeAdmin }) => {
    return (
        <>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {idx + 1}
                </th>
                <td class="px-6 py-2">
                    {user.name}
                </td>
                <td class="px-6 py-2 hidden lg:block">
                    {user.email}
                </td>
                <td class="px-6 py-2">
                    <img className='w-[50px] h-[50px] rounded-full' src={user.
                        userPhoto} alt="" />
                </td>
                <td class="px-6 py-2">
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