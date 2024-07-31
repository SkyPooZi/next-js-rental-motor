import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// mock/data.js
export const debat = () => [
    {
        id: 1,
        image: "/images/gallery/gallery1.jpg",
    },
    {
        id: 2,
        image: "/images/gallery/gallery2.jpg",
    },
    {
        id: 3,
        image: "/images/gallery/gallery3.jpg",
    },
    {
        id: 4,
        image: "/images/gallery/gallery4.jpg",
    },
    {
        id: 5,
        image: "/images/gallery/gallery5.jpg",
    },
    {
        id: 6,
        image: "/images/gallery/gallery6.jpg",
    },
    {
        id: 7,
        image: "/images/gallery/gallery7.jpg",
    },
    {
        id: 8,
        image: "/images/gallery/gallery8.jpg",
    },
    {
        id: 9,
        image: "/images/gallery/gallery9.jpg",
    },
    {
        id: 10,
        image: "/images/gallery/gallery10.jpg",
    },
    {
        id: 11,
        image: "/images/gallery/gallery11.jpg",
    },
    {
        id: 12,
        image: "/images/gallery/gallery12.jpg",
    },
    {
        id: 13,
        image: "/images/gallery/gallery13.jpg",
    },
    {
        id: 14,
        image: "/images/gallery/gallery14.jpg",
    },
    {
        id: 15,
        image: "/images/gallery/gallery15.jpg",
    },
    {
        id: 16,
        image: "/images/gallery/gallery16.jpg",
    },
    {
        id: 17,
        image: "/images/gallery/gallery17.jpg",
    },
    {
        id: 18,
        image: "/images/gallery/gallery18.jpg",
    }
];

function Debat() {
    const items = debat();
    const firstSlideItems = items.slice(0, 9);
    const secondSlideItems = items.slice(9, 18);

    return (
        <>
            <div className="m-12">
                <h1 className="text-4xl font-bold text-red-400 text-center">Gallery</h1>
            </div>

            <div className="block" id="HighlightDebat">
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 3000,
                    }}
                    modules={[Autoplay]}
                    slidesPerView={1} // Default for small screens
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {firstSlideItems.map(item => (
                        <SwiperSlide key={item.id} className="relative m-2 cursor-pointer">
                            <Image width={1000} height={1000} src={item.image} className="w-[500px] h-[250px]" alt="slider 1" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        reverseDirection: true,
                    }}
                    modules={[Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {secondSlideItems.map(item => (
                        <SwiperSlide key={item.id} className="relative m-2 cursor-pointer">
                            <Image width={1000} height={1000} src={item.image} className="w-[500px] h-[250px]" alt="slider 1" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default Debat;
