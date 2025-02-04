import React from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const CallActionSec = () => {
    return (
        <div className='mt-20'>
            <section className="bg-service rounded-md py-10 relative bg-cover bg-center ">
                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    {/* Heading */}
                    <SectionTitle subheading={'Believe Me'} heading={'Give a Pet a Forever Home'} />
                    {/* Supporting Text */}
                    <p className="text-lg sm:text-xl mb-8">
                        Adopting a pet means giving them a chance to live a better, happier life. Pets in shelters are waiting for a family <span className='inline-block lg:block'>like yours to give them the love they deserve.</span>
                    </p>

                    {/* Additional Information */}
                    <div className="text-left sm:text-center mb-8 mx-auto max-w-2xl">
                        <h3 className="text-xl font-semibold mb-4">Why Adopt?</h3>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">Pets make great companions and can help reduce stress and anxiety.</li>
                            <li className="mb-2">By adopting, you are giving a second chance to a pet in need.</li>
                            <li className="mb-2">Shelter pets are often spayed/neutered and vaccinated, making adoption a great value.</li>
                            <li className="mb-2">You are contributing to a cause and making the world a better place for animals.</li>
                        </ul>
                    </div>
                    {/* Call to Action Button */}
                    <button type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Adopt Now</button>
                </div>
            </section>
        </div>
    );
};

export default CallActionSec;