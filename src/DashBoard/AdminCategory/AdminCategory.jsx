import { NavLink } from 'react-router-dom';
import AdminUse from '../../UseHooks/AdminUse/AdminUse';
import { AiOutlineMenuFold } from "react-icons/ai";
import UseAuth from '../../AuthProvider/UseAuth';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import { BiDonateHeart } from 'react-icons/bi';
import { GiPayMoney, GiPlagueDoctorProfile } from 'react-icons/gi';
import { FcHome } from 'react-icons/fc';
import { FaUsers } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { MdPets } from "react-icons/md";
import { FaDonate } from "react-icons/fa";

const AdminCategory = () => {
    const [isAdmin] = AdminUse()
    const { user } = UseAuth()
    const dashBoardMenu = <>
        <NavLink
            to="/dashBoard/adminState/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <GrUserAdmin />
                Admin State
            </span>
        </NavLink>
        <NavLink
            to="/dashBoard/allUsers/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <FaUsers />
                All Users
            </span>
        </NavLink>
        <NavLink
            to="/dashBoard/allPets/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <MdPets />
                All Pets
            </span>
        </NavLink>
        <NavLink
            to="/dashBoard/allDonations/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <FaDonate />
                All Donations
            </span>
        </NavLink>
        <NavLink
            to="/dashBoard/adminProfile/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <GiPlagueDoctorProfile />
                Profile
            </span>
        </NavLink>
        {
            isAdmin && <>
                <div className='flex flex-col space-y-4'>
                    <h2 className='text-xl font-bold mt-4'>User Route</h2>
                    <NavLink
                        to="addPets"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-[#E7470C]'
                                : 'hover:text-[#E7470C] transition duration-700'
                        }
                    >
                        <span className='flex items-center gap-2'>
                            <MdOutlineFileDownloadDone />
                            Add a pets
                        </span>
                    </NavLink>
                    <NavLink
                        to="CreateDonation/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-[#E7470C]'
                                : 'hover:text-[#E7470C] transition duration-700'
                        }
                    >
                        <span className='flex items-center gap-2'>
                            <BiDonateHeart />
                            Create Donation Campaign
                        </span>
                    </NavLink>
                    <NavLink
                        to="userPayDonation/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-[#E7470C]'
                                : 'hover:text-[#E7470C] transition duration-700'
                        }
                    >
                        <span className='flex items-center gap-2'>
                            <GiPayMoney />
                            User Pay
                        </span>
                    </NavLink>
                </div>
                <NavLink to={'/'}>
                    <span className='flex items-center gap-2'>
                        <FcHome />
                        Home
                    </span>
                </NavLink>
            </>
        }
    </>
    console.log(user);
    return (
        <div className='rounded-xl p-4 overflow-x-auto'>
            <aside class="shadow-xl">
                <div>
                    <h1 class="text-2xl font-bold text-[#00C49F] block lg:hidden italic">WelCome to Dashboard</h1>
                    <h1 class="text-2xl font-bold text-[#00C49F] lg:mb-4">Pet Care</h1>
                </div>
                <div className="drawer lg:drawer-open z-[1000000]">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="lg:hidden">
                            <AiOutlineMenuFold className='text-xl mt-4' />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
                            <span className='text-right block text-red-900 lg:hidden'>
                                Close Menu
                            </span>
                        </label>
                        <ul className="menu bg-base-200 space-y-4
                        text-base-content min-h-full  font-medium text-[16px] p-4 lg:p-0">
                            {/* Sidebar content here */}
                            {dashBoardMenu}
                        </ul>
                    </div>
                    <div>

                    </div>
                </div>
            </aside>

        </div>
    );
};

export default AdminCategory;