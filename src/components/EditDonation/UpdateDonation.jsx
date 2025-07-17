import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import AxiosSecure from '../../UseHooks/AxiosSecure/AxiosSecure';
import AxiosPublic from '../../UseHooks/AxiosPublic';
import UseAuth from '../../AuthProvider/UseAuth';
import DatePicker from 'react-datepicker';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import toast from 'react-hot-toast';
import { upLoadImgBBPhoto } from '../../utiity/utility';
import { FaStarOfLife } from 'react-icons/fa';


const UpdateDonation = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const { user } = UseAuth()
    const { id } = useParams()
    const axiosPublic = AxiosPublic()
    const axiosSecure = AxiosSecure()
    const donation = useLoaderData()
    console.log('donation', donation);
    const navigate = useNavigate()


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (value) => {
        // console.log(value);
        setLoading(true)
        const imag = await upLoadImgBBPhoto(value.petsImage[0])
        console.log(imag)
        const donation = {
            petsImage: imag,
            petsName: value.petsName,
            amount: parseInt(value.amount),
            sortDescription: value.sortDescription,
            logDescription: value.logDescription,
            deadline: startDate,
            donationEmail: user?.email,
            Pause: 'UnPause'
        }
        const createDonation = await axiosSecure.put(`/edit-my-donation/${id}`, donation)
        // console.log('donation', createDonation);
        if (createDonation.data.modifiedCount > 0) {
            toast.success('Donation create successful')
            setLoading(false)
            navigate('/dashBoard/allDonations/')
        }
    }


    return (
        <div>
            <div className=''>
                <Helmet><title> Edit Donation Campaigns</title></Helmet>
                <SectionTitle subheading={'Update Donation Campaigns'} />
                <form onSubmit={handleSubmit(onSubmit)}
                    className="">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3'>
                        {/* pets image */}
                        <div className=''>
                            <label className='block text-[17px] font-semibold mb-2'
                            >
                                Upload Pets Image</label>
                            <input
                                {...register("petsImage", { required: 'Pets image is required' })}
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700' type="file" />
                            {
                                errors?.petsImage && (
                                    <p className='text-red-600'>
                                        {errors?.petsImage?.message}</p>
                                )
                            }
                        </div>
                        {/* pets Name */}
                        <div>
                            <label
                                className='block text-[17px] font-semibold mb-2'>
                                Pets Name</label>
                            <input
                                defaultValue={donation?.petsName}
                                type="text"
                                {...register("petsName", { required: 'Name is required' })}
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                                placeholder='Enter your pets name'
                            />
                            {errors.petsName && <p className="text-red-500 text-sm mt-1">
                                {errors?.petsName?.message}</p>}
                        </div>
                    </div>
                    {/* row 2 */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3'>
                        {/* pets category */}
                        <div>
                            <label
                                className='block text-[17px] font-semibold mb-2'>
                                Pets Category</label>
                            <select
                                defaultValue={donation?.category}
                                {...register("category")}
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            >
                                <option disabled={true}>Category</option>
                                <option value='cat'>Cat</option>
                                <option value='dog'>Dog</option>
                                <option value='fish'>Fish</option>
                                <option value='rabbits'>Rabbits</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">
                                {errors?.petsName?.message}</p>}
                        </div>
                        {/* amount section*/}
                        <div>
                            <label className='block text-[17px] font-semibold mb-2'>MAximum Amount </label>
                            <input
                                defaultValue={donation?.amount}
                                type="number"
                                {...register("amount", { required: "amount is required" })}
                                placeholder="Enter your amount"
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            />
                            {errors.amount && <p className="text-red-500 text-sm mt-1">
                                {errors?.amount?.message}</p>}
                        </div>
                    </div>

                    {/* description */}
                    <div className='mb-3'>
                        <label
                            className='block text-[17px] font-semibold mb-2'>
                            Sort Description About Pets</label>
                        <input
                            defaultValue={donation?.sortDescription}
                            type="text"
                            {...register("sortDescription", { required: 'Description is required' })}
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            placeholder='Enter your pets description'
                        />
                        {errors.sortDescription && <p className="text-red-500 text-sm mt-1">
                            {errors?.sortDescription?.message}</p>}
                    </div>
                    {/*long description */}
                    <div className='mb-3'>
                        <label
                            className='block text-[17px] font-semibold mb-2'>
                            Long Description About Pets</label>
                        <input
                            defaultValue={donation?.logDescription}
                            type="text"
                            {...register("logDescription", { required: 'Description is required' })}
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            placeholder='Enter your pets description'
                        />
                        {errors.logDescription &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.logDescription?.message}</p>}
                    </div>

                    <div className="grid lg:grid-cols-2 items-center">
                        {/* deadline */}
                        <div>
                            <h2 className='block text-[17px] font-semibold mb-2'>
                                Chose a Deadline</h2>
                            <DatePicker
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                                selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        {/* Submit Buttons */}
                        <div>
                            <button
                                type="submit"
                                className='py-2 px-3 input mt-4 lg:mt-0
                                            w-full border border-gray-700 flex 
                                            items-center justify-center gap-3 bg-gradient-to-tr from-black to-yellow-500 text-white font-semibold'
                            >
                                <span className={`${loading ? 'animate-spin' : ''}`}>
                                    <FaStarOfLife /> </span>
                                Create Donation Campaign
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default UpdateDonation;