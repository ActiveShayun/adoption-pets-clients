import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <>
            <Swiper className="mySwiper"
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-1 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl font-bold text-white'> Find Your Perfect Companion – Adopt a Pet Today!
                                <span className='inline-block font-semibold text-lg lg:block lg:mt-2'>
                                    Discover loving pets looking for their forever homes. From playful puppies to cuddly kittens, give them the life they deserve while finding your new best friend
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px]  bg-slide-2 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl  font-bold text-white'>
                                Bringing Paws and People Together – Pet Adoption Made Easy
                                <span className='inline-block font-medium text-lg lg:block lg:mt-2'>
                                    Looking for a loyal companion? Browse through our listings of rescued pets and experience the joy of adopting a new family member today
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-3 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl  font-bold text-white'> Crafting Stunning Websites, Creative Designs,
                                <span className='inline-block font-medium text-lg lg:block lg:mt-2'>
                                    and Marketing That Converts
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-4 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl  font-bold text-white'>
                                Adopt Love, Change a Life – Join Our Pet Family
                                <span className='inline-block font-medium text-lg lg:block lg:mt-2'>
                                    Explore our wide selection of pets ready for adoption. Whether you're a dog lover or a cat cuddler, there's a furry friend waiting for you!
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-5 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center   justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-white text-2xl md:text-3xl  font-bold '>
                                Your New Best Friend is Waiting – Start Your Pet Adoption Journey
                                <span className='inline-block text-lg font-medium  lg:block lg:mt-2'>
                                    We make it simple to find and adopt pets in need. Connect with shelters and caring owners to give adorable pets a second chance at happiness.
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-6 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex items-center text-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl  font-bold text-white'>
                                Forever Friends Await – Start Your Adoption Adventure
                                <span className='inline-block  font-medium text-lg lg:block lg:mt-2'>
                                    Give a loving pet a second chance at life. Find dogs, cats, and other adorable companions ready to bring joy to your home.
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px]  bg-slide-7 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex text-center items-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl font-bold text-white'>
                                Adopt Happiness – Give a Homeless Pet a Loving Home
                                <span className='inline-block font-medium text-lg lg:block lg:mt-2'>
                                    Find pets of all breeds and ages who are eagerly waiting for a loving home. Every adoption makes a difference and brings joy to both pet and owner.
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative h-[500px] lg:w-full lg:h-[570px] bg-slide-8 bg-cover bg-center rounded-md z-50 px-4 lg:px-0'>
                        <div className='z-40 flex text-center items-center justify-center h-full md:w-4/6 lg:w-4/5 mx-auto'>
                            <h2 className='text-2xl md:text-3xl font-bold text-white'>
                                Open Your Heart, Open Your Home – Adopt a Pet
                                <span className='inline-block font-medium text-lg lg:block lg:mt-2'>
                                    Adoption is love in action. Browse through our database of adorable pets and bring home a furry friend who will shower you with unconditional love
                                </span>
                            </h2>
                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-40 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;