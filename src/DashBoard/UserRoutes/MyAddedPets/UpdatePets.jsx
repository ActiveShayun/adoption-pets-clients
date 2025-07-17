import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import UseAuth from '../../../AuthProvider/UseAuth';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import AllPets from '../../../UseHooks/AllPets/AllPets';
import "react-datepicker/dist/react-datepicker.css";
import AxiosPublic from '../../../UseHooks/AxiosPublic';
import toast from 'react-hot-toast';
import { upLoadImgBBPhoto } from '../../../utiity/utility';
import { FaStarOfLife } from 'react-icons/fa';


const UpdatePets = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const Pet = useLoaderData()
    const navigate = useNavigate()
    const axiosSecure = AxiosSecure();
    const axiosPublic = AxiosPublic()
    const { user } = UseAuth()
    const { id } = useParams()
    // console.log(id);
    const [allPets, refetch] = AllPets()
    // console.log(allPets,Pet);



    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async (value) => {
        // console.log(value);
        setLoading(true)
        // console.log('Uploaded Image URL:', data, data.data.url);
        const image = await upLoadImgBBPhoto(value.petsImg[0])
        console.log(image);

        if (image) {
            try {
                const updatePet = {
                    email: user?.email,
                    petsName: value.petsName,
                    petsCategory: value.petsCategory,
                    petsAge: value.petsAge,
                    location: value.location,
                    sortDescription: value.sortDescription,
                    phoneNumber: value.phoneNumber,
                    description: value.description,
                    petsImg: image,
                    adopted: false,
                    deadline: startDate
                }
                const res = await axiosSecure.put(`/update-pets/${id}`, updatePet)
                // console.log('result', res);
                if (res.data.matchedCount > 0) {
                    toast.success('Pets Successfully updated')
                    refetch()
                    setLoading(false)
                    navigate('/dashboard/addMyPets/')
                }
            } catch (err) {
                // console.log(err);
                toast.error(err.message)
            }
        }

    }
    return (
        <div>
            <div className='py-20'>
                <SectionTitle subheading={'Favourite'} heading={'Update a pets'} />
                <form onSubmit={handleSubmit(onSubmit)}
                    class="mx-auto w-7/12">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                        {/* user email */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="email"
                                defaultValue={Pet?.email}
                                {...register("email", { required: true })}
                                id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        {/* phone number */}
                        <div class="grid md:grid-cols-1 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="number"
                                    defaultValue={Pet.phoneNumber}
                                    {...register("phoneNumber",
                                        { required: true, maxLength: 11, minLength: 11 })}
                                    id="floating_phone"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                {/* err handling */}
                                {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                                    <p className="text-red-600" role='alert'>Phone number must be 11 digits</p>
                                )}
                                {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (
                                    <p className="text-red-600" role='alert'>Phone number must be 11 digits</p>
                                )}
                                <label for="floating_phone"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (01723-456-780)</label>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                        {/* pets name */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text"
                                defaultValue={Pet.petsName}
                                {...register("petsName", { required: true })}
                                id="floating_password"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pet Name</label>
                        </div>
                        {/* pets age */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number"
                                defaultValue={Pet.petsAge}
                                {...register("petsAge", { required: true })}
                                id="floating_repeat_password"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pets Age</label>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                        {/* pet location */}
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text"
                                defaultValue={Pet.location}
                                {...register("location", { required: true })}
                                id="floating_first_name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pets Location</label>
                        </div>
                        {/* Choose Category */}
                        <div className='flex justify-start gap-6'>
                            <div class="w-full">
                                <select id="countries"
                                    defaultValue={Pet.petsCategory}
                                    {...register("petsCategory", { required: true })}
                                    class="text-gray-900 text-sm border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-b-2 border-gray-300" required>
                                    <option value='' >Choose Category</option>
                                    <option value="cat">Cat</option>
                                    <option value="dog">Dog</option>
                                    <option value="rabbits">Rabbits</option>
                                    <option value="fish">Fish</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="grid lg:grid-cols-2 md:gap-6">
                        {/* description */}
                        <div class="relative z-0 w-full mb-5 group block">
                            <textarea
                                defaultValue={Pet.description}
                                {...register("description", { required: true })}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            ></textarea>
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Long Description</label>
                        </div>
                        {/* sort description */}
                        <div class="relative z-0 w-full mb-5 group block">
                            <textarea name=""
                                defaultValue={Pet.sortDescription}
                                {...register("sortDescription", { required: true })}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            ></textarea>
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sort Description</label>
                        </div>
                    </div>
                    {/* hit imgbb and get  from url */}
                    <div className='grid grid-cols-1 md:grid-cols-2 ' >
                        <div>
                            <h2 className='block text-sm mb-2 font-medium text-gray-900 dark:text-white"'>Chose a Deadline</h2>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className='mt-2'>
                            <label class="block text-sm mb-2 font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                            <input
                                {...register("petsImg", { required: true })}
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required />
                            <p class="my-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>
                    </div>
                    <button type="submit"
                        className={`flex justify-center items-center py-2 rounded-lg font-semibold gap-3
                        text-white md:w-full
                          transition-opacity
                        bg-green-600
                        `}><span className={`${loading ? 'animate-spin' : ''}`}><FaStarOfLife /></span> Update Pets</button>
                </form>

            </div>
        </div>
    );
};

export default UpdatePets;