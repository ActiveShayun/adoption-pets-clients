import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminUse from '../../UseHooks/AdminUse/AdminUse';
import UserCategory from '../UserCategory/UserCategory';

const AdminCategory = () => {
    const [isAdmin] = AdminUse()
    return (
        <div className='bg-[#EFF7FF] rounded-xl'>
            <aside class="shadow-xl mt-10">
                <div class="pt-6 p-3">
                    <h1 class="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
                </div>
                <div class="flex flex-col px-4 gap-3">
                    <NavLink
                        to="/dashBoard/allUsers/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        All Users
                    </NavLink>
                    <NavLink
                        to="/dashBoard/allPets/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        All Pets
                    </NavLink>
                    <NavLink
                        to="/dashBoard/allDonations/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        All Donations
                    </NavLink>
                    <NavLink
                        to="/dashBoard/adminProfile/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        Profile
                    </NavLink>

                </div>
                <div className='mt-10 px-4 py-4 border-t-2 border-gray-400'>
                    <div>
                        {
                            isAdmin && <UserCategory />
                        }
                    </div>
                </div>
            </aside>

        </div>
    );
};

export default AdminCategory;