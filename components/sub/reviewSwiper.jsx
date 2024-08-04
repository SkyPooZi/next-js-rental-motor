import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../styles/swiper.css';
import ReviewCard from './ReviewCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ReviewSwiper = ({ reviews }) => {
    return (
        <>
            <div className="wrapper w-full mt-2 h-screen min-h-[750px] bg-cover bg-no-repeat relative flex" style={{ backgroundImage: "url(/images/backgroundUlasan.jpg)" }}>
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                <div className="p-8 mt-[130px] w-full overflow-x-hidden z-10">
                    <h2 className="text-3xl font-bold mb-10 text-center text-white">Ulasan</h2>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={true}
                        navigation={{
                            nextEl: '.custom-swiper-button-next',
                            prevEl: '.custom-swiper-button-prev',
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        spaceBetween={10} // Set space between slides here
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20, // Adjust this value as needed
                            },
                        }}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}

                        <div className="custom-swiper-button-prev bg-[#ff4d30] p-2 cursor-pointer rounded-full">
                            <FaArrowLeft className="text-white" />
                        </div>
                        <div className="custom-swiper-button-next bg-[#ff4d30] p-2 cursor-pointer rounded-full">
                            <FaArrowRight className="text-white" />
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ReviewSwiper;
