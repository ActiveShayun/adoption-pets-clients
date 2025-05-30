
import { Link } from 'react-router-dom';

const PetsCard = ({ pet }) => {
    console.log(pet);
    return (
        <div
            class="max-w-sm w-full h-[320px]
              rounded-lg shadow-lg overflow-hidden relative"
        >
            {/* <!-- Profile Image (circular) --> */}
            <div class="mx-auto absolute w-full h-full top-0 left-0 z-10">
                <img
                    src={pet.petsImg}
                    alt="pets"
                    class="w-full h-full object-cover"
                />
            </div>
            <div>
                {/* <!-- Top Image & Title Section --> */}
                <div class="p-6 text-center absolute bottom-0 left-0 z-40">
                    <div>
                        {/* <!-- Title --> */}
                        <h2 class="mt-4 text-xl font-semibold text-white">
                            {pet.petsName}
                        </h2>
                        {/* <!-- Description --> */}
                        <p class="mt-2 text-white">
                            {pet.description.slice(0, 50)}...
                        </p>
                    </div>
                    {/* <!-- "Read More" Button / Footer Section --> */}
                    <div class="text-center mt-3">
                        <Link
                            to={`/petsDetails/${pet._id}`}
                            class="inline-block px-6 py-2 text-white bg-pink-500 rounded-full font-semibold hover:bg-pink-600 transition-colors"
                        >
                            READ MORE
                        </Link>
                    </div>
                </div>
            </div>
            {/* bg black layer */}
            {/* <div className='absolute top-0 left-0 w-full h-full bg-black z-20 opacity-40'></div> */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none z-20"></div>


        </div>
    );
};

export default PetsCard;