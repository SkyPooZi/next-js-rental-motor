import React from 'react';

export default function Detail() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center mt-10">
                        <h2 className="text-3xl font-bold mb-4">Nama Motor</h2>
                        <img
                            src="/images/motor/dummy.png"
                            alt="Motor"
                            className="w-96 h-auto object-cover rounded-lg mt-20"
                        />
                        <div className="flex justify-between w-full mt-10">
                            <div className="mx-20">
                                <p>Daily: <span className="font-bold">150K</span></p>
                            </div>
                            <div className="mx-20">
                                <p>Weekly: <span className="font-bold">750K</span></p>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <button className="bg-white text-[#FF4D30] border border-[#FF4D30] px-8 py-2 hover:bg-[#FF4D30] hover:text-white transition">Booking Now!</button>
                        </div>
                        <div className="text-center mt-10">
                            <a href="#" className="text-[#FF4D30]">Cek Juga Motor Lainnya</a>
                        </div>
                    </div>
                    <div>
                        <div className="mt-40">
                            <h3 className="font-bold">Detail:</h3>
                            <p>• Stok: 1</p>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-bold">Fasilitas:</h3>
                            <p>• 2 Helm & 2 Jas Hujan</p>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-bold">Status:</h3>
                            <p className="text-green-500 font-bold">Tersedia</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-8 mt-8 w-3/4">
                <h2 className="text-2xl font-bold mb-6 text-center">Ulasan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array(3).fill().map((_, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                                <div className="ml-4">
                                    <div className="font-bold text-xl">Adam Aji Langit</div>
                                    <div className="flex">
                                        <span className="text-yellow-500">&#9733;</span>
                                        <span className="text-yellow-500">&#9733;</span>
                                        <span className="text-yellow-500">&#9733;</span>
                                        <span className="text-yellow-500">&#9733;</span>
                                        <span className="text-gray-300">&#9733;</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex space-x-2">
                                    <img src="/images/motor/review.png" alt="Review Image" className="object-cover w-20 h-20" />
                                    <img src="/images/motor/review.png" alt="Review Image" className="object-cover w-20 h-20" />
                                </div>
                            </div>
                            <p className="text-gray-700 text-base">
                                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
