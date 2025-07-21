
import { AiOutlineMenuFold } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import { GiPayMoney } from "react-icons/gi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FcHome } from "react-icons/fc";


const UserCategory = () => {

    const dashBoardMenu = <>
        <NavLink
            to="addMyPets"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <BsDatabaseFillAdd />
                My Added pets
            </span>
        </NavLink>
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
            to="myCreateDonation/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <FaDonate />
                My Donation Campaigns
            </span>
        </NavLink>
        <NavLink
            to="myDonationHistory/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <TbTransactionDollar />
                My Payment History
            </span>
        </NavLink>
        <NavLink
            to="adoptionRequest/"
            className={({ isActive }) =>
                isActive
                    ? 'text-[#E7470C]'
                    : 'hover:text-[#E7470C] transition duration-700'
            }
        >
            <span className='flex items-center gap-2'>
                <LuGitPullRequestCreateArrow />
                Adoption Request
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
                User Pay Donationfff
            </span>
        </NavLink>
        <NavLink
            to="userProfile/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#815241]'
            }
        >
            <span className='flex items-center gap-2'>
                <GiPlagueDoctorProfile />
                Profile
            </span>
        </NavLink>
        <NavLink to={'/'}>
            <span className='flex items-center gap-2'>
                <FcHome />
                Home
            </span>
        </NavLink>
    </>

    return (
        <div className='z-[90000] p-4'>
            <div>
                <h1 class="text-2xl font-bold text-[#00C49F] block lg:hidden italic">WelCome to Dashboard</h1>
                <h1 class="text-2xl font-bold text-[#00C49F]">Pet Care</h1>
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
                    <label htmlFor="my-drawer-2" aria-label="close sidebar"
                        className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content space-y-4 lg:mt-4
                     min-h-full text-[16px] p-4 lg:p-0 lg:px-0">
                        {/* Sidebar content here */}
                        {dashBoardMenu}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default UserCategory;