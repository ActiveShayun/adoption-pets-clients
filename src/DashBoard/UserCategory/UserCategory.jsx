import React from 'react';
import { NavLink } from 'react-router-dom';

const UserCategory = () => {
    return (
        <div className='w-full bg-[#F3F4F6] rounded-lg'>
            <aside class=" bg-white shadow-xl mt-10">
                <div class="pt-6 p-3">
                    <h1 class="text-2xl font-bold text-blue-600">User Dashboard</h1>
                </div>
                <div class="flex flex-col px-4 gap-3">
                    <NavLink
                        to="addMyPets"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        My Added pets
                    </NavLink>
                    <NavLink
                        to="addPets"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        Add a pets
                    </NavLink>
                    <NavLink
                        to="CreateDonation/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        Create Donation Campaign
                    </NavLink>
                    <NavLink
                        to="myCreateDonation/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        My Donation Campaigns
                    </NavLink>
                    <NavLink
                        to="myDonations/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        My Donations
                    </NavLink>
                    <NavLink
                        to="adoptionRequest/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black border-b-2 border-blue-500'
                                : 'hover:text-[#E7470C]'
                        }
                    >
                        Adoption Request
                    </NavLink>
                </div>
                <div className='mt-10 px-4 py-4 border-t-2 border-gray-400'>
                    <NavLink to={'/'}>Home</NavLink>
                </div>
            </aside>
        </div>
    );
};

export default UserCategory;