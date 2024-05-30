"use client";

import { useState } from 'react';

const Catalog = () => {
    const [activeTab, setActiveTab] = useState('Rekomendasi');

    const motors = [
        { id: 1, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
        { id: 2, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
        { id: 3, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
        { id: 4, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
        { id: 5, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
        { id: 6, name: 'Nama Motor', daily: '50K', weekly: '320K', img: '/images/motor/dummy.png' },
    ];

    return (
        <div style={{ marginTop: '50px', marginLeft: '300px', marginRight: '300px' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Pilihan Motor</h2>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className={`text-${activeTab === 'Rekomendasi' ? '[#FF4D30]' : 'gray-600'} border-b-2 ${activeTab === 'Rekomendasi' ? 'border-[#FF4D30]' : 'border-transparent'}`}
                        onClick={() => setActiveTab('Rekomendasi')}
                    >
                        Rekomendasi
                    </a>
                    <a
                        href="#"
                        className={`text-${activeTab === 'Matic' ? '[#FF4D30]' : 'gray-600'} border-b-2 ${activeTab === 'Matic' ? 'border-[#FF4D30]' : 'border-transparent'}`}
                        onClick={() => setActiveTab('Matic')}
                    >
                        Matic
                    </a>
                    <a
                        href="#"
                        className={`text-${activeTab === 'Manual' ? '[#FF4D30]' : 'gray-600'} border-b-2 ${activeTab === 'Manual' ? 'border-[#FF4D30]' : 'border-transparent'}`}
                        onClick={() => setActiveTab('Manual')}
                    >
                        Manual
                    </a>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {motors.map((motor) => (
                        <div key={motor.id} className="bg-white rounded-lg shadow p-4">
                            <img src={motor.img} alt="Motor" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-center font-bold my-2 mt-10">{motor.name}</h3>
                            <div className="flex justify-around my-2 mt-5">
                                <p>Daily: <br />{motor.daily}</p>
                                <p>Weekly: <br />{motor.weekly}</p>
                            </div>
                            <div className="text-center mt-4">
                                <button className="bg-white text-[#FF4D30] border border-[#FF4D30] px-8 py-2 font-bold hover:bg-[#FF4D30] hover:text-white transition mt-10">Booking Now!</button>
                                <p className="text-[#FF4D30] mt-2">Lihat detail</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
