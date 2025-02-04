import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const PetsCategorySection = () => {
    return (
        <div className='mt-20'>

            <section className="py-10 bg-gray-100">
                <div className="container mx-auto px-4">
                    <SectionTitle subheading={'Discover Pet Types'} heading={' Explore Our Pet Categories'} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {/* Cats */}
                        <Link
                            href="#cats"
                            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Cats"
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-center text-lg font-medium">Cats</h3>
                        </Link>

                        {/* Dogs */}
                        <Link
                            href="#dogs"
                            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Dogs"
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-center text-lg font-medium">Dogs</h3>
                        </Link>

                        {/* Rabbits */}
                        <Link
                            href="#rabbits"
                            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src="https://images.pexels.com/photos/27742215/pexels-photo-27742215/free-photo-of-a-small-brown-and-white-guinea-sitting-on-top-of-a-brick.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                alt="Rabbits"
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-center text-lg font-medium">Rabbits</h3>
                        </Link>

                        {/* Fish */}
                        <Link
                            href="#fish"
                            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src="https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Fish"
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-center text-lg font-medium">Fish</h3>
                        </Link>

                        {/* Add more categories if needed */}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PetsCategorySection;