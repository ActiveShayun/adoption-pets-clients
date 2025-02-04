import { format, isValid } from 'date-fns';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Donation from './Donation';

const DonationDetails = () => {
    const detailsDonation = useLoaderData();
    // console.log(detailsDonation);
    const { id } = useParams()
    return (
        <div>
            <Helmet><title>Donation Details</title></Helmet>
            <div className="max-w-4xl relative mx-auto pt-24 p-6 bg-white rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Left Side - Pet Image */}
                <div className="relative w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={detailsDonation.petsImage}
                        alt={detailsDonation.petsName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                {/* Right Side - Pet Details */}
                <div className="flex flex-col justify-between w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800">{detailsDonation.petsName}</h2>
                    <p className="text-gray-600 text-lg italic mt-2">{detailsDonation.sortDescription}</p>

                    {/* Divider */}
                    <div className="border-t border-gray-300 my-4"></div>

                    {/* Pet Details */}
                    <div className="space-y-3">
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">
                            </span>
                            {detailsDonation.logDescription}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">
                                Amount:</span> {detailsDonation.amount}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-6 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 underline">Contact Info</h3>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">
                                Deadline:</span>
                            {
                                detailsDonation.deadline && isValid(new Date(detailsDonation.deadline))
                                    ? format(new Date(detailsDonation.deadline), 'P')
                                    : 'Invalid or missing deadline'
                            }
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-blue-600">Email:</span> {detailsDonation.donationEmail
                            }
                        </p>
                    </div>
                    <div className='mt-5'>
                        {
                            detailsDonation.Pause === 'Pause' ?
                                <button
                                    disabled={detailsDonation.Pause === 'Pause'}
                                    className="ml-2 bg-red-500 text-white text-xs font-bold  px-4 py-2 rounded-md">
                                    {detailsDonation.Pause === 'Pause' &&
                                        'Do Not Donate Now'
                                    }
                                </button> :
                                <Link to={`/donated/${detailsDonation._id}`}>
                                    <button
                                        disabled={detailsDonation.Pause === 'Pause'}
                                        className="ml-2 bg-red-500 text-white text-xs font-bold  px-4 py-2 rounded-md">
                                        Donate Now
                                    </button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
            <Donation/>
        </div>
    );
};

export default DonationDetails;