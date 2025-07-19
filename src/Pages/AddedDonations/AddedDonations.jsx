import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Cards from "../../DashBoard/UserRoutes/MyDonations/Cards";

const AddedDonations = () => {
    const { myDonations, isLoading } = Cards()

    return (
        <div className='pt-10'>
            <Helmet><title>User pay Donations</title></Helmet>
            <SectionTitle subheading={'User Pay Donations'} />
            <div className='mt-5'>
                {
                    isLoading && <p className='text-center'>Loading</p>
                }
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left border">
                        <thead class="text-xs uppercase border">
                            <tr>
                                <th scope="col" class="px-4 py-3">
                                    Donner Name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Pet Image
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Pet name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Donated amount
                                </th>
                                {myDonations?.length ?
                                    <Link to={'/dashBoard/donationPay/'}>
                                        <button className="btn">
                                            Pay Donation
                                        </button>
                                    </Link> :
                                    <button className="btn" disabled>
                                        Pay Donation
                                    </button>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myDonations?.map(donation => <tr key={donation._id}
                                    class="">
                                    <th scope="row" class="px-4 py-4 font-medium whitespace-nowrap">
                                        {donation.donnerName}
                                    </th>
                                    <th scope="row" class="px-4 py-4 font-medium  whitespace-nowrap ">
                                        <img className='w-[50px] h-[50px] rounded-full'
                                            src={donation.petsImage} alt="" />
                                    </th>
                                    <td class="px-4 py-4">
                                        {donation.petsName}
                                    </td>
                                    <td class="px-4 py-4">
                                        {donation.donationAmount}
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

export default AddedDonations;