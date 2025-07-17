import { format } from 'date-fns'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosPublic from '../../UseHooks/AxiosPublic';
import toast from 'react-hot-toast';
import UseAuth from '../../AuthProvider/UseAuth';
import Swal from 'sweetalert2';
import Cards from '../../DashBoard/UserRoutes/MyDonations/Cards';


const DonationCard = ({ donation }) => {
    const { petsImage, petsName, amount, deadline, _id, category } = donation
    // console.log(donation);
    const axiosSecure = AxiosPublic()
    const { refetch } = Cards()
    const { user } = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()


    const handleAddDonation = async (donations) => {
        // console.log(donations);
        if (!user && !user?.email) {
            Swal.fire({
                title: "Do you an account",
                showDenyButton: true,
                confirmButtonText: "Please Login",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    return navigate('/login', { state: { form: location }, replace: true })
                }
            });
        }
        else {
            const donationInfo = {
                deadline: deadline,
                donationAmount: amount,
                donationId: _id,
                donnerEmail: user?.email,
                donnerName: user?.displayName,
                petsImage: petsImage,
                petsName: petsName,
                petsCategory: category

            }
            const { data } = await axiosSecure.post('/provide-donation', donationInfo)
            console.log('donation', data);
            if (data.result.insertedId) {
                toast.success(`${donations.petsName} Donation added successful`)
                refetch()
            }

        }

    }


    return (
        <div>
            <div className="w-[300px] bg-white shadow-lg rounded-2xl overflow-hidden">
                <img
                    src={petsImage}
                    alt={`${petsName}`}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <div className="mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {petsName}
                        </h2>
                    </div>
                    <div className="text-gray-600 text-sm">
                        <p>
                            <span className="font-medium">Maximum Donation:</span> ${amount}
                        </p>
                        <p>
                            <span className="font-medium">Last Deadline </span>
                            {format(new Date(deadline), 'P')}

                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                            // style={{ width: `${donationPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {/* {donationPercentage.toFixed(2)}% funded */}
                        </p>
                    </div>
                    <button onClick={() => handleAddDonation(donation)}
                        className="mt-4 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700">
                        Add Donation
                    </button>

                    <Link to={`/detailsDonation/${_id}`}>
                        <button
                            className="mt-4 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonationCard;