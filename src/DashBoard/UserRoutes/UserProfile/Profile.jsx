import React, { useState } from 'react';
import { MdMarkEmailRead, MdOutlinePhoneInTalk } from 'react-icons/md';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import UseAuth from '../../../AuthProvider/UseAuth';
import { FaCamera } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import { Link } from 'react-router-dom';
import Modal from '../../../Shared/Modal/Modal';

const Profile = () => {
    const { user } = UseAuth()
    const axiosSecure = AxiosSecure()
    const [isOpen, setIsOpen] = useState(false)

    const { data: updateProfile = [] } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-User?email=${user?.email}`)
            console.log('userInfo', data);
            return data
        }

    })
    return (
        <div className='min-h-screen flex flex-col items-center justify-center relative'>
            <SectionTitle heading={'Your Vip Profile'} />
            <div className='bg-slide-1 w-9/12 h-[200px] bg-cover bg-no-repeat p-4  rounded-md 
         '>
                <div className='w-[150px] h-[150px] object-cover rounded-full  z-70 relative top-28'>
                    <img
                        src={updateProfile?.userPhoto} alt=""
                        className='w-[150px] h-[150px] object-cover rounded-full
                        '
                    />
                    <div className='relative -top-10 -right-[50%]'>
                        <input
                            className='w-[30px] h-[30px] top-0 left-2  rounded-full z-50 absolute opacity-0'
                            name='profile-pic'
                            type="file" required />
                    </div>
                </div>
                <div className='relative top-32'>
                    <h2 className='font-semibold'>Name - {updateProfile?.name}</h2>
                    <h2 className='font-semibold flex gap-2 items-center'>
                        <span><MdMarkEmailRead /></span>
                        Email - {updateProfile?.email}
                    </h2>
                    <h2 className='font-semibold flex gap-2 items-center'>
                        <span><MdOutlinePhoneInTalk /></span>
                        Phone - 01904772345
                    </h2>
                    <address>
                        Dhaka, Bangladesh
                    </address>

                    <button onClick={() => setIsOpen(true)}
                        className='border-2 mt-4 px-3 py-1 font-semibold rounded-lg'>Update Profile</button>

                    <Modal updateProfile={updateProfile} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

            </div>

        </div>
    );
};

export default Profile;