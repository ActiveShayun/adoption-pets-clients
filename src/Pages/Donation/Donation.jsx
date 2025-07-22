import React from 'react';
import AxiosSecure from '../../UseHooks/AxiosSecure/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DonationCard from './DonationCard';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const Donation = () => {
    const axiosSecure = AxiosSecure()

    const { data: allDonation = [] } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-donation')
            console.log(res.data);
            return res.data
        }

    })

    return (
        <div className='pt-10 mx-auto'>
         <Helmet><title>Donation Page</title></Helmet>
            <SectionTitle subheading={'Support Our Mission'} heading={'Save Pets Life'} />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center  gap-4 mx-auto justify-items-center'>
                {
                    allDonation?.map(donation =>
                        <DonationCard
                            donation={donation}
                            key={donation._id}
                        >
                        </DonationCard>)
                }
            </div>
        </div>
    );
};

export default Donation;