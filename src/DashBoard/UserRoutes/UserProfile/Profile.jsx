import React, { useState } from 'react';
import { MdMarkEmailRead, MdOutlinePhoneInTalk } from 'react-icons/md';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import UseAuth from '../../../AuthProvider/UseAuth';
import { FaCamera } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import Modal from '../../../Shared/Modal/Modal';

const Profile = () => {
    const { user } = UseAuth()
    const axiosSecure = AxiosSecure()
    const [isOpen, setIsOpen] = useState(false)

    const { data: updateProfile = [], refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-User?email=${user?.email}`)
            console.log('userInfo', data);
            return data
        }

    })
    return (
        <div className=''>
            <SectionTitle heading={'Your Vip Profile'} />
            <div className=' p-4 '>
                <div className='rounded-full'>
                    <img
                        src={updateProfile?.userPhoto} alt=""
                        className='w-[150px] h-[150px] object-cover rounded-full
                        '
                    />
                </div>
                <div className=''>
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

                    <Modal
                        updateProfile={updateProfile}
                        isOpen={isOpen} setIsOpen={setIsOpen}
                        refetch={refetch} />
                </div>

            </div>

        </div>
    );
};

export default Profile;