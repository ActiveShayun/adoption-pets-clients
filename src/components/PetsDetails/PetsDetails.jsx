
import { useLoaderData, useParams } from 'react-router-dom';
import AdoptionRequest from '../AdoptionRequest';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const PetsDetails = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const pets = useLoaderData()
    // console.log(pets);

    const { id } = useParams()
    // console.log(id);


    return (
        <div>
             <Helmet><title>PetsDetails</title></Helmet>
            <div className="max-w-4xl mx-auto pt-24 p-6 bg-white rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Left Side - Pet Image */}
                <div className="relative w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={pets.petsImg}
                        alt={pets.petsName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                            {pets.petsCategory.toUpperCase()}
                        </span>

                        {/* <button className="ml-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                                Already Adopted
                            </button> */}

                        <button className="ml-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                            Adopted Me
                        </button>

                    </div>
                </div>

                {/* Right Side - Pet Details */}
                <div className="flex flex-col justify-between w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800">{pets.petsName}</h2>
                    <p className="text-gray-600 text-lg italic mt-2">{pets.sortDescription}</p>

                    {/* Divider */}
                    <div className="border-t border-gray-300 my-4"></div>

                    {/* Pet Details */}
                    <div className="space-y-3">
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Description:</span>{" "}
                            {pets.description}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Age:</span> {pets.petsAge} years
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Location:</span> {pets.location}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-6 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 underline">Contact Info</h3>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Phone:</span> {pets.phoneNumber}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Email:</span> {pets.email}
                        </p>
                    </div>
                    <div className='mt-5'>
                        <button
                            onClick={openModal}
                            className="ml-2 bg-red-500 text-white text-xs font-bold  px-4 py-2 rounded-md">
                            Adopted Me
                        </button>
                    </div>
                </div>
            </div>

            <AdoptionRequest
                isOpen={isModalOpen}
                onClose={closeModal}
                petName="Bella"
                petId="123"
                petImage="/path/to/image.jpg"
                pets={pets}
            >
            </AdoptionRequest>
        </div>

    );
};

export default PetsDetails;