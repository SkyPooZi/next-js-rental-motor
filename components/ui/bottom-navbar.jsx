'use client';

import React from 'react';
import { motion } from 'framer-motion';

const BottomNavbar = () => {
    const navItems = [
        { name: 'Beranda', icon: '🏠', link: '/' },
        { name: 'Motor', icon: '🛵', link: '/catalog' },
        { name: 'Tentang', icon: '❓', link: '/about' },
        { name: 'S&K', icon: '🗒️', link: '/snk' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-50">
            <ul className="flex justify-between py-4 px-5">
                {navItems.map((item, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        className="text-center"
                    >
                        <a href={item.link} className="flex flex-col items-center text-gray-600">
                            <span className="text-3xl">{item.icon}</span>
                            <span className="text-sm">{item.name}</span>
                        </a>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
};

export default BottomNavbar;
