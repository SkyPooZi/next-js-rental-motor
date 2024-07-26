import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0">
                    {review.user.gambar ? (
                        <img src={`https://rental-motor.ruscarestudent.com/storage/${review.user.gambar}`} alt={review.user.nama_pengguna} className="rounded-full w-full h-full object-cover" />
                    ) : null}
                </div>
                <div className="ml-4 text-black">
                    <div className="font-bold text-xl">{review.user.nama_pengguna}</div>
                    <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < review.penilaian ? "text-yellow-500" : "text-gray-300"}>&#9733;</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex space-x-2">
                    {review.gambar ? (
                        <img src={`https://rental-motor.ruscarestudent.com/storage/${review.gambar}`} alt="Review Image" className="object-cover w-20 h-20" />
                    ) : null}
                </div>
            </div>
            <p className="text-gray-700 text-base">
                {review.komentar}
            </p>
        </div>
    );
};

export default ReviewCard;