// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../../UseHooks/AxiosPublic';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import ReactStars from "react-rating-stars-component";

const ReviewSection = () => {
    const axiosPublic = AxiosPublic()
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review')
            console.log(res.data);
            return res.data
        }
    })
    return (
        <div className='mt-14 mb-20'>
            <SectionTitle subheading={'Clients Feedback'} heading={'Testimonial'}/>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                breakpoints={{
                    // When window width is >= 0px
                    0: {
                        slidesPerView: 1,
                    },
                    // When window width is >= 640px
                    640: {
                        slidesPerView: 2,
                    },
                    // When window width is >= 1024px
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {
                    reviews?.map(review => <SwiperSlide>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <p><FaQuoteLeft /></p>
                            <img
                                className='w-[100px] h-[100px] rounded-full mx-auto'
                                src={review?.clients?.photo} alt="review" />
                            <h2 className='text-xl font-semibold mt-2'>
                                {review?.clients?.name}</h2>
                            <p>{review?.review}</p>
                            <div className='flex justify-center'>
                                <ReactStars count={review.rating} size={30} activeColor="#FFD700" />
                            </div>
                            <p className='flex justify-end'><FaQuoteRight /></p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default ReviewSection;