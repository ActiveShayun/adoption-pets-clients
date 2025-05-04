
import { Link } from 'react-router-dom';

const PetsCard = ({ pet }) => {
    console.log(pet);
    return (
        <div
            class="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500">
            {/* <!-- Top Image & Title Section --> */}
            <div class="p-6 text-center">
                {/* <!-- Profile Image (circular) --> */}
                <div class="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                        src={pet.petsImg}
                        alt="pets"
                        class="w-full h-full object-cover"
                    />
                </div>

                {/* <!-- Title --> */}
                <h2 class="mt-4 text-xl font-semibold text-gray-800">
                    {pet.petsName}
                </h2>

                {/* <!-- Description --> */}
                <p class="mt-2 text-gray-600">
                    {pet.description.slice(0, 50)}...
                </p>
            </div>

            {/* <!-- "Read More" Button / Footer Section --> */}
            <div class="bg-blue-50 p-4 text-center">
                <Link
                    to={`/petsDetails/${pet._id}`}
                    class="inline-block px-6 py-2 text-white bg-pink-500 rounded-full font-semibold hover:bg-pink-600 transition-colors"
                >
                    READ MORE
                </Link>
            </div>
        </div>
    );
};

export default PetsCard;