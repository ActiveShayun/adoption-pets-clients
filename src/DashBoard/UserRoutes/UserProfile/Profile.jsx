import React from 'react';
import { MdMarkEmailRead, MdOutlinePhoneInTalk } from 'react-icons/md';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import UseAuth from '../../../AuthProvider/UseAuth';

const Profile = () => {
    const {user} = UseAuth()
    return (
        <div className='min-h-screen flex flex-col items-center justify-center relative'>
            <SectionTitle heading={'Your Vip Profile'} />
            <div className='bg-slide-1 w-9/12 h-[200px] bg-cover bg-no-repeat p-4 flex justify-center items-center rounded-md relative 
         '>
                <img
                    src={user?.photoURL} alt=""
                    className='w-[150px] h-[150px] object-cover rounded-full absolute left-5 -bottom-10'
                />
                <div className='absolute left-5 -bottom-36'>
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