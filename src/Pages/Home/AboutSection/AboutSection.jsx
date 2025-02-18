import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdScreenSearchDesktop } from 'react-icons/md';
import { VscGitStashApply } from 'react-icons/vsc';

const AboutSection = () => {
    return (
        <div>
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    {/* Heading */}
                    <h2 className="text-3xl font-semibold sm:text-4xl mb-6">About Us</h2>

                    {/* Short Introduction */}
                    <p className="text-lg sm:text-xl mb-8 text-gray-700">
                        Welcome to Pet Care! We're dedicated to connecting pets in need with loving homes.
                        <span className='lg:block'>
                            Our platform allows you to easily browse and adopt pets, ensuring a better future for animals everywhere.
                        </span>
                    </p>

                    {/* Why We Were Made */}
                    <div className="mb-12 w-4/5 mx-auto">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Why We Were Created</h3>
                        <p className="text-lg sm:text-xl text-gray-700">
                            Our website was created to make pet adoption simpler and more accessible. We understand
                            <span className='lg:block'>
                                the importance of  giving pets a second chance at life, and our goal is to connect people with the perfect pets in need of a home.
                            </span>
                        </p>
                    </div>

                    {/* How it Works */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-x-8 sm:space-y-0">
                        <div className="max-w-xs text-center">
                            <div className="mb-4">
                                <MdScreenSearchDesktop className='text-4xl block mx-auto' />
                            </div>
                            <h4 className="font-semibold text-xl">Browse Pets</h4>
                            <p className="text-gray-600">
                                Search our platform to find available pets ready for adoption. Filter by type, size, age, and more.
                            </p>
                        </div>
                        <div className="max-w-xs text-center">
                            <div className="mb-4">
                                <VscGitStashApply className='text-4xl block mx-auto' />
                            </div>
                            <h4 className="font-semibold text-xl">Apply for Adoption</h4>
                            <p className="text-gray-600">
                                Once you’ve found the perfect pet, apply to adopt them through our simple and secure process.
                            </p>
                        </div>
                        <div className="max-w-xs text-center">
                            <div className="mb-4">
                                <FaHome className='text-4xl block mx-auto' />
                            </div>
                            <h4 className="font-semibold text-xl">Bring Them Home</h4>
                            <p className="text-gray-600">
                                After approval, welcome your new furry friend into your home and start a new chapter together!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;