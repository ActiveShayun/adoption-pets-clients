import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../UseHooks/AxiosSecure/AxiosSecure';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

const ProvideDonation = () => {
    const axiosSecure = AxiosSecure();

    const { data: provideDonation = [] } = useQuery({
        queryKey: ['provide'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-provide-donation')
            // console.log('ProvideDonation', res.data);
            return res.data
        }

    })


    return (
        <div className='pt-20'>

            <SectionTitle subheading={' Donation Collect page'}
                heading={'Who Donated And How Much Donated'} />
            <div className='mt-4'>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Donner name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Donner Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pet Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    pets Image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Donation amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                provideDonation?.map(donation => <tr key={donation._id}
                                    class="bg-white dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {donation.donnerName}
                                    </th>
                                    <td class="px-6 py-4">
                                        {donation.donnerEmail}
                                    </td>
                                    <td class="px-6 py-4">
                                        {donation.petsName}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img className='w-[50px] h-[50px] rounded-full'
                                            src={donation.petsImage} alt="" />
                                    </td>
                                    <td class="px-6 py-4">
                                        $  {donation.donationAmount}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ProvideDonation;