'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../styles/swiper.css';
import '../../styles/slideInAnimation.css';
import { Button } from '@material-tailwind/react';

const ProductSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [hasMounted, setHasMounted] = useState(false);
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animationTriggered) {
                    entry.target.classList.add('slide-in'); // or 'slide-in-right' based on your requirement
                    setAnimationTriggered(true); // Mark the animation as triggered
                }
            });
        }, { threshold: 0.1 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [animationTriggered]);

    const products = [
        {
            id: '6',
            image: '/images/motor/nmax.png',
            bgImage: '/images/backgroundHomepage.jpg',
            title: 'NMAX',
            price: 'Rp. 218.750',
        },
        {
            id: '4',
            image: '/images/motor/xmax.png',
            bgImage: '/images/backgroundHomepage.jpg',
            title: 'XMAX',
            price: 'Rp. 250.000',
        },
        {
            id: '5',
            image: '/images/motor/pcx.png',
            bgImage: '/images/backgroundHomepage.jpg',
            title: 'PCX',
            price: 'Rp. 218.750',
        },
        {
            id: '7',
            image: '/images/motor/vario-160.png',
            bgImage: '/images/backgroundHomepage.jpg',
            title: 'Vario 160',
            price: 'Rp. 200.000',
        },
    ];

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    }

    return (
        <div className="wrapper w-full mt-2 h-screen min-h-[750px] bg-cover bg-no-repeat relative flex" style={{ backgroundImage: "url(/images/backgroundBlack.jpg)" }}>
            <div ref={observerRef} className={`flex flex-col md:flex-row lg:mt-10 items-start relative mx-auto w-full max-w-[1050px] h-[600px] ${hasMounted ? 'delay-1' : ''}`}>
                <div className="hidden lg:flex flex-col gap-2 mt-8 md:mt-16 items-start bg-shape h-full bg-gradient-to-tr from-[#FF4D33] to-[#FF4D33]/2 shadow-[#FF4D33]/40 shadow-lg rounded-[30px] p-6 md:p-[45px_40px] w-full md:w-1/2 top-0 left-0">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        Motor
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        <span className="ml-6">Favorit</span>
                    </h1>
                    <Image src='/images/backgroundReading.png' alt='element' className='w-48 md:w-96' width={1000} height={1000} />
                </div>
                <div className="product-slider relative w-full md:w-3/4 h-full mt-6 md:mt-0 lg:mt-16 rounded-[30px] shadow-[#FF4D33]/40 shadow-lg">
                    <Swiper
                        spaceBetween={30}
                        effect='slide'
                        loop={true}
                        pagination={false}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.next',
                            prevEl: '.prev'
                        }}
                        onSlideChange={handleSlideChange}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="product-slider__wrp swiper-wrapper h-full"
                        onSwiper={setSwiperInstance}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="product-slider__item swiper-slide h-full w-full cursor-pointer relative">
                                <div className="product-slider__card h-full flex items-center w-full transition-all duration-500 overflow-hidden relative rounded-[30px] hidden-content">
                                    <Image width={1000} height={1000} src={product.bgImage} alt={product.title} className="product-slider__cover flex flex-col absolute top-0 left-0 w-full h-full object-cover rounded-[30px]" />
                                    <div className="product-slider__content flex flex-col md:flex-row items-center text-white pt-1 relative z-[2] pb-44 md:pb-5 lg:pb-5 w-full p-6 md:pl-[50px] md:pr-[80px]">
                                        <Image width={1000} height={1000} src={product.image} alt={`${product.title} image`} className="product-slider__image w-full md:w-[50%] object-contain rounded-[20px] mb-4 md:mb-0 md:mr-[30px]" />
                                        <div className="product-slider__text flex flex-col items-center md:items-start text-center md:text-left">
                                            <h1 className="product-slider__title m-0 mb-[10px] font-[900] text-[24px] md:text-[41px] leading-[1.2em] tracking-[2px]">{product.title}</h1>
                                            <span className="product-slider__price block text-[24px] md:text-[42px]">{product.price}</span>
                                            <div className="product-slider__bottom mt-[20px]">
                                                <Link href={`/form/${product.id}`} className='mt-5'>
                                                    <Button className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                                        <span className="relative text-base z-10">Sewa Sekarang!</span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
