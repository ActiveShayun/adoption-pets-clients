import React, { useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../AuthProvider/UseAuth';
import DatePicker from 'react-datepicker';
import AxiosPublic from '../../../UseHooks/AxiosPublic';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


// img upload key
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const AddDonationCampaigns = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = UseAuth()
    const axiosPublic = AxiosPublic()
    const axiosSecure = AxiosSecure()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (value) => {
        // console.log(value);
        const formData = new FormData();
        formData.append("image", value.petsImage[0]);
        // console.log(formData);

        const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${img_hosting_api}`, formData);
        // console.log(res.data.data.url)
        const donation = {
            petsImage: res.data.data.url,
            petsName: value.petsName,
            amount: parseInt(value.amount),
            sortDescription: value.sortDescription,
            logDescription: value.logDescription,
            deadline: startDate,
            donationEmail: user?.email,
            Pause: false
        }
        const createDonation = await axiosSecure.post('/create-donation', donation)
        // console.log('donation', createDonation);
        if (createDonation.data.insertedId) {
            toast.success('Donation create successful')
        }
    }

    return (
        <div className='mt-10'>
            <Helmet><title> AddDonation Campaigns</title></Helmet>
            <SectionTitle subheading={'Your Generosity Helps Us Provide for Pets in Need'} heading={'Support Our Mission'} />
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 lg:w-8/12 mx-auto">

                {/* upload img section */}
                <div className='mt-2'>
                    <label class="block text-sm  font-medium text-gray-900 dark:text-white mb-3" for="file_input">Upload Pets Image</label>
                    <input
                        {...register("petsImage")}
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required />
                    <p class="my-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
                {/* User Name */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700 mb-3">
                        Pets Name</label>
                    <input
                        type="text"
                        {...register("petsName")}
                        className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100 cursor-not-allowed"
                        placeholder='Enter your pets name'
                    />
                    {errors.petsName && <p className="text-red-500 text-sm mt-1">{errors.petsName.message}</p>}
                </div>

                {/* amount section*/}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">MAximum Amount </label>
                    <input
                        type="number"
                        {...register("amount", { required: "amount is required" })}
                        placeholder="Enter your amount"
                        className={`w-full px-3 py-2 border rounded shadow-sm ${errors.amount ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                </div>
                {/* description */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700 mb-3">
                        Sort Description About Pets</label>
                    <input
                        type="text"
                        {...register("sortDescription")}
                        className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100"
                        placeholder='Enter your pets description'
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                {/*long description */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700 mb-3">
                        Long Description About Pets</label>
                    <input
                        type="text"
                        {...register("logDescription")}
                        className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100 "
                        placeholder='Enter your pets description'
                    />
                    {errors.logDescription && <p className="text-red-500 text-sm mt-1">{errors.logDescription.message}</p>}
                </div>

                {/* deadline */}
                <div>
                    <h2 className='block text-sm mb-2 font-medium text-gray-900 dark:text-white"'>Chose a Deadline</h2>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2
                         bg-blue-500 text-white
                          hover:bg-blue-600 rounded-lg"
                    >
                        Create Donation Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDonationCampaigns;