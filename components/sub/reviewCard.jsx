import React from 'react';
import Image from 'next/image';

const ReviewCard = ({ review }) => {
    const placeholderImage = "https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=";

    return (
        <div className="w-80 h-[340px] rounded-xl overflow-hidden cursor-pointer shadow-lg p-4 bg-white">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0">
                    {review.user.gambar ? (
                        <Image width={1000} height={1000} src={`https://rental-motor.ruscarestudent.com/storage/${review.user.gambar}`} alt={review.user.nama_pengguna} className="rounded-full w-full h-full object-cover" />
                    ) : (
                        <Image width={1000} height={1000} src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="Placeholder" className="rounded-full w-full h-full object-cover" />
                    )}
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
            <div className="mb-4 flex justify-center">
                {review.gambar ? (
                    <Image width={1000} height={1000} src={`https://rental-motor.ruscarestudent.com/storage/${review.gambar}`} alt="Review Image" className="rounded-md object-cover w-32 h-32" />
                ) : (
                    <Image width={1000} height={1000} src={placeholderImage} alt="Placeholder" className="object-cover w-20 h-20" />
                )}
            </div>
            <p className="text-gray-700 text-base h-32 overflow-hidden">
                "{review.komentar}"
            </p>
        </div>
    );
};

export default ReviewCard;
