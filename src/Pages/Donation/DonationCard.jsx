import { format } from 'date-fns'
import { Link } from 'react-router-dom';


const DonationCard = ({ donation }) => {
    // console.log(donation);

    const { petsImage, petsName, amount,  deadline, _id } = donation
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