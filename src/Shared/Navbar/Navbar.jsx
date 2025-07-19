import { Link, NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../../AuthProvider/UseAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import AdminUse from "../../UseHooks/AdminUse/AdminUse";
import Modal from "../../Pages/Home/Home/ReviewModal/Modal";
import loginBtn from '../../../src/assets/loginBtn.json'
import Lottie from "lottie-react";
import Cards from "../../DashBoard/UserRoutes/MyDonations/Cards";


const Navbar = () => {
    const { user, handleSignOut } = UseAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate()
    const [isAdmin] = AdminUse()
    const { myDonations } = Cards()

    // console.log('isAdmin', isAdmin);


    const signOutUser = () => {
        handleSignOut()
            .then(() => {
                toast.success('user signOut successful')
                navigate('/login')
            })
            .catch(err => {
                toast.error('user signOut failed', err)
            })
    }

    const link = <>
        <NavLink
            to="/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black font-bold border-b-2 border-blue-500'
                    : ' hover:text-[#E7470C]'
            }
        >
            Home
        </NavLink>

        <NavLink
            to="petsListing/"
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            Pet Listing
        </NavLink>
        <NavLink
            to={"donation/"}
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            Donation Campaigns
        </NavLink>
        <NavLink
            to={""}
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            <div className="flex items-center gap-2">
                My Donation Card
                <span className="text-red-700">{myDonations?.length}</span>
            </div>
        </NavLink>
        <button
            onClick={() => document.getElementById('my_modal_1').showModal()}
            className={({ isActive }) =>
                isActive
                    ? 'text-black border-b-2 border-blue-500'
                    : 'hover:text-[#E7470C]'
            }
        >
            Add Review
        </button>

    </>

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <nav className="shadow-sm bg-gray-400 max-w-7xl sticky z-[454544] mx-auto top-0">
            <div className="container mx-auto flex items-center justify-between px-6 ">
                {/* Logo */}
                <div className="text-lg font-bold text-gray-800">Pet Care</div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {link}
                    </ul>
                </div>

                {/* Profile and Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <img title={user?.displayName}
                            src={user?.photoURL}  // Replace with dynamic user image
                            alt="User Profile"
                            className="h-10 w-10 rounded-full cursor-pointer"
                            onClick={toggleDropdown} />

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                {isAdmin ? <NavLink
                                    to={'/dashBoard/adminState/'}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Dashboard
                                </NavLink> :
                                    <NavLink
                                        to="dashboard/addMyPets"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </NavLink>
                                }

                                {
                                    user ?
                                        <button
                                            onClick={signOutUser}
                                            className="block bg-gray-300 w-full text-left px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button> :
                                        <Link to={'login/'}>
                                            <button
                                                className="block bg-gray-300 w- text-left px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                                            >
                                                <Lottie animationData={loginBtn} />
                                            </button>
                                        </Link>
                                }
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center text-gray-700"
                        onClick={toggleMobileMenu}
                    >
                        {
                            user ?
                                <div>
                                    <img title={user?.displayName}
                                        className="w-[40px] h-[40px] rounded-full"
                                        src={user?.photoURL} alt="" />
                                </div> :
                                <div>
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </div>
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-green-500">
                    <ul className="flex flex-col gap-4 px-6 py-4">
                        {link}
                    </ul>
                </div>
            )}
            {/* add review section */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <Modal />
                </div>

            </dialog>
        </nav>
    )

};

export default Navbar;



