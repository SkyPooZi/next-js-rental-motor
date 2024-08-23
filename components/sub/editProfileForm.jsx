import { Card, CardHeader, Input, Textarea, Button } from '@material-tailwind/react';

const EditProfileForm = ({
    user,
    imagePreview,
    image,
    handleSubmit,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    setNamaPengguna,
    setNamaLengkap,
    setAlamat,
    setNomorHp,
    loading
}) => {
    return (
        <Card className="w-full h-full mb-10">
            <form action="post" method="post" onSubmit={handleSubmit}>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Informasi Pengguna</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <span className="text-black">Foto</span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || image}
                                alt="Image Preview"
                                className="max-w-36 h-auto rounded-full"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Pilih Foto
                            </button>
                        </div>
                        <span className="text-[#6B7280] text-xs">
                            Gambar profile memiliki rasio 1:1 dan tidak lebih dari 2MB.
                        </span>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Pengguna</span>
                                <Input
                                    label={`Masukkan nama pengguna (${user.nama_pengguna})`}
                                    onChange={(e) => setNamaPengguna(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Lengkap</span>
                                <Input
                                    label={`Masukkan nama lengkap (${user.nama_lengkap})`}
                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Alamat</span>
                                <Textarea
                                    label={`Masukkan alamat (${user.alamat})`}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nomor HP</span>
                                <Input
                                    label={`Masukkan no hp (${user.nomor_hp})`}
                                    onChange={(e) => setNomorHp(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                loading={loading}
                            >
                                {loading ? 'Loading...' : 'Edit Profile'}
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
            </form>
        </Card>
    );
};

export default EditProfileForm;