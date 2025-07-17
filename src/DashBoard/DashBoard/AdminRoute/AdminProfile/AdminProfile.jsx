import React from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import UseAuth from '../../../../AuthProvider/UseAuth';
import { MdMarkEmailRead, MdOutlinePhoneInTalk } from 'react-icons/md';

const AdminProfile = () => {
    const { user } = UseAuth()
    console.log(user);
    return (
        <div className='min-h-screen flex flex-col items-center relative'>
            <SectionTitle heading={'Your Vip Profile'} />
            <div className='bg-slide-1 w-9/12 h-[200px] bg-cover bg-no-repeat p-4 flex justify-center items-center rounded-md relative 
             '>
                <img
                    src={user?.photoURL} alt=""
                    className='w-[150px] h-[150px] object-cover rounded-full absolute left-5 -bottom-10'
                />
                <div className='absolute left-5 -bottom-44'>
                    <h2 className='font-semibold mb-1'>Name - {user?.displayName}</h2>
                    <h2 className='font-semibold flex gap-2 items-center mb-1'>
                        <span><MdMarkEmailRead /></span>
                        Email - {user?.email}
                    </h2>
                    <h2 className='font-semibold flex gap-2 items-center mb-1'>
                        <span><MdOutlinePhoneInTalk /></span>
                        Phone - 01904772345
                    </h2>
                    <address className='mb-3'>
                        Dhaka, Bangladesh
                    </address>
                    <div className='border-dotted border-b-8 '></div>
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;