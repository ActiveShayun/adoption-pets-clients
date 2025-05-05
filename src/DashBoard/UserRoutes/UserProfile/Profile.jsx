import React from 'react';
import { MdMarkEmailRead, MdOutlinePhoneInTalk } from 'react-icons/md';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import UseAuth from '../../../AuthProvider/UseAuth';
import { FaCamera } from "react-icons/fa";

const Profile = () => {
    const { user } = UseAuth()
    return (
        <div className='min-h-screen flex flex-col items-center justify-center relative'>
            <SectionTitle heading={'Your Vip Profile'} />
            <div className='bg-slide-1 w-9/12 h-[200px] bg-cover bg-no-repeat p-4  rounded-md 
         '>
                <div className='w-[150px] h-[150px] object-cover rounded-full  border-2 border-green-500  z-70 relative top-28'>
                    <img
                        src={user?.photoURL} alt=""
                        className='w-[150px] h-[150px] object-cover rounded-full
                        z-60'
                    />
                    <div className='relative -top-10 -right-[50%]'>
                        <input
                            className='w-[30px] h-[30px] top-0 left-2  rounded-full z-50 absolute opacity-0'
                            name='profile-pic'
                            type="file" required />
                        <span className='absolute left-2'>
                            <FaCamera  className='text-2xl' />
                        </span>
                    </div>
                </div>
                <div className='relative top-32'>
                    <h2 className='font-semibold'>Name - {user?.displayName}</h2>
                    <h2 className='font-semibold flex gap-2 items-center'>
                        <span><MdMarkEmailRead /></span>
                        Email - {user?.email}
                    </h2>
                    <h2 className='font-semibold flex gap-2 items-center'>
                        <span><MdOutlinePhoneInTalk /></span>
                        Phone - 01904772345
                    </h2>
                    <address>
                        Dhaka, Bangladesh
                    </address>
                </div>
            </div>

        </div>
    );
};

export default Profile;