import { NavLink } from 'react-router-dom';
import footerAnimation from '../../assets/footerImg.json'
import Lottie from 'lottie-react';
import { FaFacebook } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer class="bg-[#9CA3AF]  mt-16 py-4 text-white">
                <div class="mx-auto w-full max-w-screen-xl">
                    <div class=" px-4  md:grid-cols-4">
                        <div >
                            <div className='flex items-center justify-center gap-4 lg:gap-8'>
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

                            </div>
                            <div className='h-[100px] w-[200px] mx-auto my-4'>
                                <Lottie animationData={footerAnimation} />
                            </div>
                        </div>
                    </div>
                    <div class="px-4 text-black pt-10">
                        <div class="flex justify-center mt-4 gap-8 mb-4 mt-4
                        ">
                            <a href="https://www.facebook.com/"
                                className='text-white text-2xl'>
                                <FaFacebook />
                            </a>
                            <a href="https://x.com/?lang=en&mx=2"
                                className='text-white text-2xl'>
                                <FaDiscord />
                            </a>
                            <a href="https://x.com/?lang=en&mx=2"
                                className='text-white text-2xl'>
                                <FaTwitter />
                            </a>
                            <a href="#" className='text-white text-2xl'>
                                <FaInstagram />
                            </a>
                        </div>
                        <div >
                            <span class="text-sm text-center block">© 2023
                                <a href="https://flowbite.com/">Adoption Zone</a>.
                                All Rights Reserved.
                            </span>
                        </div>
                    </div>
                </div>
            </footer >

        </div >
    );
};

export default Footer;