
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import serviceImg from '../../../assets/servicePets.webp'
const OurService = () => {
    return (
        <div className='mt-16'>
            <SectionTitle subheading={'what we offer'} heading={'Our Services'} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h2 className='text-3xl font-semibold mb-3'>Quality Services</h2>
                    <p className='text-[#9E9E9E] mb-2'>Our commitment to excellence ensures that every service we provide meets the highest standards of quality and reliability. we deliver tailored solutions that exceed expectations, every time.</p>
                    <p className='mb-4'>
                        Driven by innovation and professionalism, we offer a wide range of premium services designed to enhance efficiency and deliver outstanding results. Trust us to bring unmatched expertise and value to every project..
                    </p>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Contact Us</button>
                </div>
                <div>
                    <img src={serviceImg} 
                    className='h-[300px] w-full object-cover rounded-lg' alt="" />
                </div>
            </div>
        </div>
    );
};

export default OurService;