import React, { useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../AuthProvider/UseAuth';
import DatePicker from 'react-datepicker';
import AxiosPublic from '../../../UseHooks/AxiosPublic';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { upLoadImgBBPhoto } from '../../../utiity/utility';
import { FaStarOfLife } from 'react-icons/fa';
import useImageCompress from '../../../utiity/compressImage ';



const AddDonationCampaigns = () => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const { user } = UseAuth()
    const axiosPublic = AxiosPublic()
    const { compress } = useImageCompress()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (value) => {
        setLoading(true)
        const compressImage = await compress(value.petsImage[0])
        const uploadImg = await upLoadImgBBPhoto(compressImage)
        console.log('uploadImg', uploadImg);

        const donation = {
            // petsImage: uploadImg,
            petsName: value.petsName,
            category: value.category,
            amount: parseInt(value.amount),
            sortDescription: value.sortDescription,
            logDescription: value.logDescription,
            deadline: startDate,
            donationEmail: user?.email,
            Pause: false
        }
        const createDonation = await axiosPublic.post('/create-donation', donation)
        console.log('donation', createDonation);
        if (createDonation.data.insertedId) {
            toast.success('Donation create successful')
            setLoading(false)
        }
    }

    return (
        <div className=''>
            <Helmet><title> AddDonation Campaigns</title></Helmet>
            <form onSubmit={handleSubmit(onSubmit)}
                className="">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3'>
                    {/* pets image */}
                    <div className=''>
                        <label className='block  font-semibold mb-2'
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
                            className='block  font-semibold mb-2'>
                            Pets Name</label>
                        <input
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
                            className='block  font-semibold mb-2'>
                            Pets Category</label>
                        <select defaultValue="Medium"
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
                        <label className='block  font-semibold mb-2'>MAximum Amount </label>
                        <input
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
                        className='block  font-semibold mb-2'>
                        Sort Description About Pets</label>
                    <input
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
                        className='block  font-semibold mb-2'>
                        Long Description About Pets</label>
                    <input
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
                        <h2 className='block  font-semibold mb-2'>
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
        </div>
    );
};

export default AddDonationCampaigns;