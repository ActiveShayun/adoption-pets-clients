import { useForm } from "react-hook-form";
import AxiosSecure from "../UseHooks/AxiosSecure/AxiosSecure";
import UseAuth from "../AuthProvider/UseAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AdoptionRequest = ({ isOpen, onClose, pets }) => {

    const axiosSecure = AxiosSecure()
    const { user } = UseAuth()
    // console.log(user?.email, pets.email);
    // console.log('pets', pets);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onsubmit = async (value) => {
        // if (user?.email === pets?.email) {
        //     return toast.error('pets owner can not request own pets')
        // }
        const petRequest = {
            petsId: pets._id,
            
            petsName: pets.petsName,
            petsEmail: pets.email,
            email: user?.email,
            phoneNumber: value.phone,
            location: value.address,
            petsImg: pets.petsImg,
            userName: user?.displayName,
            adopted: false
        }

        const res = await axiosSecure.post('/adoption-request', petRequest)
        console.log('request', res);
        if (res.data.insertedId) {
            toast.success('Adoption Request sending Successful !!!')
            onClose();
        }

    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Helmet><title>Adoption Request</title></Helmet>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{pets.petsName}</h2>
                <form onSubmit={handleSubmit(onsubmit)}
                    className="space-y-4">
                    {/* User Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            {...register("userName")}
                            defaultValue={user?.displayName}
                            disabled
                            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            defaultValue={user?.email}
                            disabled
                            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            {...register("phone", { required: "Phone number is required" })}
                            placeholder="Enter your phone number"
                            className={`w-full px-3 py-2 border rounded shadow-sm ${errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            {...register("address", { required: "Address is required" })}
                            placeholder="Enter your address"
                            className={`w-full px-3 py-2 border rounded shadow-sm ${errors.address ? "border-red-500" : "border-gray-300"
                                }`}
                        ></textarea>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AdoptionRequest;