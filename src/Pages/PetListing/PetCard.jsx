import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
    const { petsName, petsImg, location, petsAge, _id, deadline } = pet;
    return (
        <div data-aos="fade-up"
            data-aos-duration="3000">
            <Helmet><title>Pet Listing</title></Helmet>
            <div class="max-w-sm mx-auto bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-xl overflow-hidden">
                <div class="relative group overflow-hidden">
                    <img
                        class="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-110"
                        src={petsImg}
                        alt="Pet Image"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 class="text-3xl font-extrabold text-white">{petsName}</h2>
                    </div>
                </div>
                <div class="p-5 space-y-3">
                    <p class="text-gray-600">
                        <span class="font-semibold">Age : </span> {petsAge} years
                    </p>
                    <p class="text-gray-600">
                        <span class="font-semibold">Location : </span> {location}
                    </p>
                    <p class="text-gray-600">
                        <span class="font-semibold">Deadline : </span>
                        {format(new Date(deadline), 'P')}
                    </p>
                    <Link to={`/petsDetails/${_id}`}>
                        <button
                            class="w-full mt-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PetCard;