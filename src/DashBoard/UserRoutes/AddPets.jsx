import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import AxiosSecure from '../../UseHooks/AxiosSecure/AxiosSecure';
import AxiosPublic from '../../UseHooks/AxiosPublic';
import toast from 'react-hot-toast';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import UseAuth from '../../AuthProvider/UseAuth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { upLoadImgBBPhoto } from '../../utiity/utility';
import { FaStarOfLife } from 'react-icons/fa';

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`


const AddPets = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = AxiosSecure();
    const axiosPublic = AxiosPublic();
    const [loading, setLoading] = useState(false)
    const { user } = UseAuth()
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()
    console.log('form error', errors);
    const onSubmit = async (value) => {
        toast.success('Data Adding...')
        // console.log(value);
        setLoading(true)
        const imgUpload = await upLoadImgBBPhoto(value.petsImg[0])
        console.log('imgUpload', imgUpload);

        // console.log('Uploaded Image URL:', data, data.data.url);

        if (imgUpload) {
            try {
                const allPets = {
                    email: user?.email,
                    petsName: value.petsName,
                    petsCategory: value.petsCategory,
                    petsAge: value.petsAge,
                    location: value.location,
                    sortDescription: value.sortDescription,
                    phoneNumber: value.phoneNumber,
                    description: value.description,
                    petsImg: imgUpload,
                    adopted: 'UnAdopted',
                    deadline: startDate
                }
                const res = await axiosSecure.post('allPets', allPets)
                // console.log('result', res);
                if (res.data.insertedId) {
                    toast.success('Pets Successfully Added')
                    setLoading(false)
                    reset()
                    navigate('/dashboard/addMyPets/')
                }
            } catch (err) {
                // console.log(err);
                toast.error(err.message)
            }
        }

    }

    return (
        <div className=''>
            <Helmet><title>Add Pets</title></Helmet>
            <SectionTitle subheading={'Favourite'} heading={'Add a pets'} />
            <form onSubmit={handleSubmit(onSubmit)}
                className=" mx-auto">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    {/* user email */}
                    <div class="w-full mb-2">
                        <label for="floating_email"
                            className='block text-[17px] font-semibold mb-2'>
                            Email address*</label>
                        <input type="email"
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            defaultValue={user?.email}
                            {...register("email", { required: 'email is required' })}
                            id="floating_email" />

                        {
                            errors?.email && (
                                <p className='text-red-600'>{errors?.email?.message}</p>
                            )
                        }

                    </div>
                    {/* phone number */}
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="w-full mb-2">
                            <label for=""
                                className='block text-[17px] font-semibold mb-2'>
                                Phone*</label>
                            <input type="number"
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                                {...register("phoneNumber",
                                    { required: true, maxLength: 11, minLength: 11 })}
                                id="floating_phone"
                                placeholder=" Enter your number" required />
                            {/* err handling */}
                            {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                                <p className="text-red-600" role='alert'>Phone number must be 11 digits</p>
                            )}
                            {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (
                                <p className="text-red-600" role='alert'>Phone number must be 11 digits</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    {/* pets name */}
                    <div className="w-full mb-2 group">
                        <label className='block text-[17px] font-semibold mb-2'
                        >Pet Name*</label>
                        <input type="text"
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("petsName", { required: 'Pets name is required' })}
                            placeholder="Enter pets name" />
                        {
                            errors?.petsName && (
                                <p className='text-red-600'>{errors?.petsName?.message}</p>
                            )
                        }

                    </div>
                    {/* pets age */}
                    <div className="relative z-0 w-fullmb-2 group">
                        <label className='block text-[17px] font-semibold mb-2'>
                            Pets Age*</label>
                        <input type="number"
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("petsAge", { required: 'Pets age is required' })}
                            id="floating_repeat_password"
                            placeholder="Enter pets age" />
                        {
                            errors?.petsAge && (
                                <p className='text-red-600'>{errors?.petsAge?.message}</p>
                            )
                        }
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    {/* pet location */}
                    <div class="relative z-0 w-full mb-2 group">
                        <label className='block text-[17px] font-semibold mb-2'>
                            Pets Location*</label>
                        <input type="text"
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("location", { required: 'Location in required' })}
                            placeholder="Enter location" />
                        {
                            errors?.location && (
                                <p className='text-red-600'>{errors?.location?.message}</p>
                            )
                        }
                    </div>
                    {/* Choose Category */}
                    <div className='flex justify-start gap-6'>
                        <div className="w-full">
                            <label htmlFor="" className='block text-[17px] font-semibold mb-2' >
                                Select Category*
                            </label>
                            <select
                                defaultValue="Choose Category"
                                {...register("petsCategory", { required: 'Category is required ' })}
                                className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            >
                                <option value='' >Choose Category</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                                <option value="rabbits">Rabbits</option>
                                <option value="fish">Fish</option>
                            </select>
                            {
                                errors?.petsCategory && (
                                    <p className='text-red-600'>{errors?.petsCategory?.message}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2 md:gap-6">
                    {/* description */}
                    <div className="relative z-0 w-full mb-2 group block">
                        <label for="floating_company"
                            className='block text-[17px] font-semibold mb-2' >
                            Long Description*</label>
                        <textarea name="" id=""
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("description", { required: 'Description is required' })}
                            placeholder="Long description..."
                        ></textarea>
                        {
                            errors?.description && (
                                <p className='text-red-600'>{errors?.description?.message}</p>
                            )
                        }
                    </div>
                    {/* sort description */}
                    <div className="w-fullmb-2 ">
                        <label className='block text-[17px] font-semibold mb-2'>
                            Sort Description*</label>
                        <textarea name="" id=""
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("sortDescription",
                                { required: 'Sort Description required' })}
                            placeholder="sort Description"
                        ></textarea>
                        {
                            errors?.sortDescription && (
                                <p className='text-red-600'>{errors?.sortDescription?.message}</p>
                            )
                        }
                    </div>
                </div>
                {/* hit imgbb and get  from url */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                    <div className='w-full'>
                        <h2 className='block text-[17px] font-semibold mb-2'>
                            Chose a Deadline</h2>
                        <DatePicker
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className='mt-2'>
                        <label className='block text-[17px] font-semibold mb-2' for="file_input">Upload Image*</label>
                        <input
                            className='text-gray-500 py-2 px-3 input w-full border border-gray-700'
                            {...register("petsImg", { required: 'Upload image is required' })}
                            type="file" />
                        {
                            errors?.petsImg && (
                                <p className='text-red-600'>{errors?.petsAge?.message}</p>
                            )
                        }
                        <p className="my-2 text-sm" id="file_input_help">
                            SVG, PNG, JPG or GIF (MAX. 800x400px).
                        </p>
                    </div>
                    <div>
                        <button type="submit"
                            className='py-2 px-3 input
                             w-full border border-gray-700 flex 
                             items-center justify-center gap-3 bg-gradient-to-tr from-black to-yellow-500 text-white font-semibold'>
                            <span className={`${loading ? 'animate-spin' : ''}`}><FaStarOfLife /></span>
                            Add a pets</button>
                    </div>
                </div>

            </form>

        </div>
    );
};

export default AddPets;