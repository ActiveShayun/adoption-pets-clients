import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import AxiosPublic from "../../UseHooks/AxiosPublic";
import AxiosSecure from "../../UseHooks/AxiosSecure/AxiosSecure";
import { useState } from "react";
import UseAuth from "../../AuthProvider/UseAuth";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { upLoadImgBBPhoto } from "../../utiity/utility";
import { FaStarOfLife } from "react-icons/fa";

// img upload key
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const EditDonation = () => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const axiosSecure = AxiosSecure();
    const { id } = useParams();
    const donation = useLoaderData();
    // console.log(donation);
    const navigate = useNavigate();


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (value) => {
        // console.log(value);
        setLoading(true)
        const image = await upLoadImgBBPhoto(value.petsImage[0]);
        console.log(image);

        const donation = {
            petsImage: image,
            petsName: value.petsName,
            amount: parseInt(value.amount),
            sortDescription: value.sortDescription,
            logDescription: value.logDescription,
            deadline: startDate,
            donationEmail: user?.email,
            Pause: false
        }
        const createDonation = await axiosSecure.put(`/edit-my-donation/${id}`, donation)
        // console.log('donation', createDonation);
        if (createDonation.data.modifiedCount) {
            toast.success('Donation create successful')
            setLoading(false)
            navigate('/dashboard/myCreateDonation/')
        }
    }

    return (
        <div>
            <div className='mt-10'>
                <Helmet><title> Edit Donation Campaigns</title></Helmet>
                <SectionTitle subheading={'Update Donation Campaigns'} />
                <form onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 lg:w-8/12 mx-auto">

                    {/* upload img section */}

                    <div className='mt-2'>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-3">
                            Upload Image</label>
                        <input
                            type="file"
                            {...register("petsImage")}
                            className="file-input file-input-bordered file-input-accent  w-full" required />
                    </div>
                    {/* User Name */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-3">
                            Pets Name</label>
                        <input
                            type="text"
                            defaultValue={donation.petsName}
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
                            defaultValue={donation.amount}
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
                            defaultValue={donation.sortDescription}
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
                            defaultValue={donation.logDescription}
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
                    <div className="flex justify-end space-x-4 w-full">
                        <button
                            type="submit"
                            className="flex justify-center items-center gap-3 px-5 py-2
                         bg-blue-500 text-white
                          hover:bg-blue-600 rounded-lg"
                        ><span className={`${loading ? 'animate-spin' : ''}`}>
                                <FaStarOfLife /> </span> Update Donation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDonation;