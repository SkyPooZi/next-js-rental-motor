'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/scrollTextAnimation.css';

export default function ScrollTextAnimation() {
    const [visibleItems, setVisibleItems] = useState([]);

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        const items = document.querySelectorAll('.item');
        const newVisibleItems = Array.from(items).filter(item => isInViewport(item));
        setVisibleItems(newVisibleItems.map(item => item.id));
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="outer-container mt-20">
            <div className="flex flex-col items-center justify-center bg-[#FF4D30] text-white py-8 w-full">
                <div className="box">
                    {/* <h2 className="textAnimation">Rental <br /> Motor Kudus</h2> */}
                    <p className="textAnimation text-center mt-2">Rencanakan perjalanan Anda sekarang</p>
                    <br />
                    <h1 className="textAnimation font-bold text-center">Penyewaan Cepat & Mudah</h1>
                    <div className="container">
                        <div className={`item ${visibleItems.includes('item1') ? 'visible' : ''}`} id="item1">
                            <img src="/images/cs.png" alt="24/7" />
                            <p>24/7 Customer Service</p>
                        </div>
                        <div className={`item ${visibleItems.includes('item2') ? 'visible' : ''}`} id="item2">
                            <img src="/images/deliv.png" alt="Free Delivery" />
                            <p>Gratis Pengambilan Area Kudus</p>
                        </div>
                        <div className={`item ${visibleItems.includes('item3') ? 'visible' : ''}`} id="item3">
                            <img src="/images/wallet.png" alt="Best Price" />
                            <p>Harga Terbaik Mulai Dari 50K</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
