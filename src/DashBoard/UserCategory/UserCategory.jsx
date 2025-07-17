
import { AiOutlineMenuFold } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const UserCategory = () => {

    const dashBoardMenu = <>
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
            to="myDonationHistory/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            My Payment History
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
        <NavLink
            to="userPayDonation/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            User Pay Donation
        </NavLink>
        <NavLink
            to="userProfile/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#815241]'
            }
        >
            Profile
        </NavLink>
        <NavLink to={'/'}>Home</NavLink>
    </>

    return (
        <div className='z-[90000]'>
            <div>
                <h1 class="text-2xl font-bold text-blue-600">User Dashboard</h1>
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
                    <label htmlFor="my-drawer-2" aria-label="close sidebar"
                        className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content space-y-2
                     min-h-full text-[17px]">
                        {/* Sidebar content here */}
                        {dashBoardMenu}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserCategory;