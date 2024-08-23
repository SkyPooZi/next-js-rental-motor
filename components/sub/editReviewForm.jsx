import React from 'react';
import { Card, CardHeader, Input, Textarea, Button } from '@material-tailwind/react';

const EditReviewForm = ({
    handleSubmit,
    imagePreview,
    image,
    review,
    setNamaPengguna,
    totalStars,
    renderStar,
    setKomentar,
    loading,
}) => {
    return (
        <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Edit Ulasan</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <span className="text-black">Foto</span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || image}
                                alt="Image Preview"
                                className="max-w-40 h-auto rounded-md"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Pengguna</span>
                                <Input
                                    label={`Nama Pengguna (${review?.user?.nama_pengguna || ''})`}
                                    onChange={(e) => setNamaPengguna(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Penilaian</span>
                                <div className="flex gap-3 cursor-pointer">
                                    {[...Array(totalStars)].map((_, index) => {
                                        const starValue = index + 1;
                                        return renderStar(starValue);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Komentar</span>
                                <Textarea
                                    label={`Komentar (${review?.komentar || ''})`}
                                    onChange={(e) => setKomentar(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                loading={loading}
                            >
                                {loading ? 'Loading...' : 'Ubah Data'}
                            </Button>
                        </div>
                        <div>
                            <a href="/admin">
                                <button
                                    type='button'
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Kembali
                                </button>
                            </a>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </form>
    );
};

export default EditReviewForm;
