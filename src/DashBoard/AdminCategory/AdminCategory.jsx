import { NavLink } from 'react-router-dom';
import AdminUse from '../../UseHooks/AdminUse/AdminUse';
import { AiOutlineMenuFold } from "react-icons/ai";
import UseAuth from '../../AuthProvider/UseAuth';

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
            Admin State
        </NavLink>
        <NavLink
            to="/dashBoard/allUsers/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            All Users
        </NavLink>
        <NavLink
            to="/dashBoard/allPets/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            All Pets
        </NavLink>
        <NavLink
            to="/dashBoard/allDonations/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            All Donations
        </NavLink>
        <NavLink
            to="/dashBoard/adminProfile/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            Profile
        </NavLink>
        {
            isAdmin && <div className='space-y-2 flex flex-col'>
                <h2 className='text-xl font-bold mt-4'>User Route</h2>
                <NavLink
                    to="addPets"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#E7470C]'
                            : 'hover:text-[#E7470C] transition duration-700'
                    }
                >
                    Add a pets
                </NavLink>
                <NavLink
                    to="CreateDonation/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#E7470C]'
                            : 'hover:text-[#E7470C] transition duration-700'
                    }
                >
                    Create Donation Campaign
                </NavLink>
                <NavLink
                    to="adoptionRequest/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#E7470C]'
                            : 'hover:text-[#E7470C] transition duration-700'
                    }
                >
                    Adoption Request
                </NavLink>
                <NavLink
                    to="userPayDonation/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#E7470C]'
                            : 'hover:text-[#E7470C] transition duration-700'
                    }
                >
                    User Pay Donation
                </NavLink>
                <NavLink to={'/'}>Home</NavLink>
            </div>
        }
    </>
    console.log(user);
    return (
        <div className='rounded-xl'>
            <aside class="shadow-xl">
                <div className='mb-2'>
                    <h1 class="text-xl font-bold">
                        <span className='mr-2'>Hi</span>
                        <span className='text-[#FF8042]'>
                            {user?.displayName}</span>
                        <span className='block'>Wel Come To Dashboard</span></h1>
                </div>
                <div className="drawer lg:drawer-open z-[1000000]">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                            <AiOutlineMenuFold className='text-xl mt-4' />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                        <ul className="menu bg-base-200 space-y-2
                        text-base-content  font-medium text-[16px] p-4 lg:p-0">
                            {/* Sidebar content here */}
                            {dashBoardMenu}
                        </ul>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='mt-10 px-4 py-4 border-t-2 border-gray-400'>

                </div>
            </aside>

        </div>
    );
};

export default AdminCategory;