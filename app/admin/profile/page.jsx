'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import {
    Card,
    CardHeader,
    Button,
    Input,
    Textarea
} from "@material-tailwind/react";
import { MdDone } from "react-icons/md";

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import("@/components/sub/admin/dashboard"), { ssr: false });
const MotorList = dynamic(() => import("@/components/sub/admin/motorList"), { ssr: false });
const User = dynamic(() => import("@/components/sub/admin/user"), { ssr: false });
const History = dynamic(() => import("@/components/sub/admin/history"), { ssr: false });
const Rating = dynamic(() => import("@/components/sub/admin/rating"), { ssr: false });
const Discount = dynamic(() => import("@/components/sub/admin/discount"), { ssr: false });
const Sidebar = dynamic(() => import('@/components/main/sidebar'), { ssr: false });
const NavbarAdmin = dynamic(() => import("@/components/sub/admin/navbar"), { ssr: false });
const OTPPopup = dynamic(() => import('@/components/sub/admin/sendOTP'), { ssr: false });
const Loading = dynamic(() => import('@/components/ui/loading'), { ssr: false });
import { updateUser } from '@/utils/services/updateUser';
import { fetchUserData } from '@/utils/services/userService';
import { handleVerifyOTP } from '@/utils/services/otpService';
import { handleEmailChangeAdmin } from '@/utils/services/handleEmailChangeAdmin';
import { handlePasswordResetAdmin } from '@/utils/services/handlePasswordResetAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Page = () => {
    const [nama_pengguna, setNamaPengguna] = useState('');
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nomor_hp, setNomorHp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [otpPopupVisible, setOtpPopupVisible] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [user, setUser] = useState({ email: '' });
    const [serverOtp, setServerOtp] = useState('');
    const [loadData, setLoadData] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const id = Cookies.get('id');
    const token = Cookies.get('token');

    const formatPhoneNumber = (phone) => {
        // Ensure that the phone number starts with +62
        if (!phone.startsWith('+62')) {
            return '+62' + phone.replace(/^0+/, '');
        }
        return phone;
    };

    const stripPrefix = (phoneNumber) => {
        if (phoneNumber.startsWith('+62')) {
            return phoneNumber.slice(3);
        }
        return phoneNumber;
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData({ id, token });
                console.log('Fetched data:', userData);
                setUser(userData);
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${userData.gambar}`);
                setNamaPengguna(userData.nama_pengguna);
                setNamaLengkap(userData.nama_lengkap);
                setAlamat(userData.alamat);
                setNomorHp(stripPrefix(userData.nomor_hp));
                setEmail(userData.email);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, [id, token]);

    useEffect(() => {
        console.log(nomor_hp)
        if (nomor_hp.startsWith('+62')) {
            setNomorHp(nomor_hp.slice(3)); // Remove '+62'
        } else {
            setNomorHp(nomor_hp);
        }
    }, [nomor_hp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedUser = await updateUser({
                id,
                token,
                file,
                nama_pengguna,
                nama_lengkap,
                nomor_hp: formatPhoneNumber(nomor_hp),
                alamat,
            });

            console.log('Updated data:', updatedUser);
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${updatedUser.gambar}`);
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);

            setUser((prevUser) => ({
                ...prevUser,
                ...(nama_pengguna && { nama_pengguna: updatedUser.nama_pengguna }),
                ...(nama_lengkap && { nama_lengkap: updatedUser.nama_lengkap }),
                ...(nomor_hp && { nomor_hp: updatedUser.nomor_hp }),
                ...(alamat && { alamat: updatedUser.alamat }),
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerify = async (otp) => {
        await handleVerifyOTP(otp, {
            id: user.id,
            email,
            token,
            setErrorOtp: setError,
            setLoadingOtp: setLoadingEmail,
            setShowNotification,
            setUser,
            setOtpPopupVisible,
            serverOtp
        });
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    if (typeof window !== 'undefined') {
        console.log("Window Test");
    }

    return (
        <>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'rating' ? null :
                <div className="block p-4 xl:ml-80">
                    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                        <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                            <div className="capitalize">
                                <nav aria-label="breadcrumb" className="w-max">
                                    <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                        <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                            <a href="#">
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">beranda</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Profile
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Profile</h6>
                            </div>
                            <div className="flex">
                                <div className="md:order-1 sm:order-2 order-2">
                                    <NavbarAdmin />
                                </div>
                                <div className="order-1">
                                    <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                                </div>
                            </div>
                        </div>
                    </nav>
                    {loadData && (
                        <Loading />
                    )}
                    <div className="mb-20 xl:mb-0 mt-12">
                        {user ? (
                            <>
                                <Card className="w-full h-full mb-10">
                                    <form action='post' method='post' onSubmit={handleSubmit}>
                                        <CardHeader floated={false} shadow={false} className="rounded-none">
                                            <div className="mb-4 flex flex-col justify-between gap-4">
                                                <span className="text-black font-medium">
                                                    Informasi Pengguna
                                                </span>
                                                <div className="border-t border-[#969696] w-full"></div>
                                                <span className="text-black">
                                                    Foto
                                                </span>
                                                <div className="mr-4">
                                                    <img
                                                        src={imagePreview || image}
                                                        alt="Image Preview"
                                                        className="w-32 h-32 object-cover rounded-full"
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
                                                    Gambar profile memiliki rasio 1:1
                                                    dan tidak lebih dari 2MB.
                                                </span>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Nama Pengguna
                                                        </span>
                                                        <Input
                                                            label={`Masukkan nama pengguna`}
                                                            value={nama_pengguna}
                                                            onChange={(e) => setNamaPengguna(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Nama Lengkap
                                                        </span>
                                                        <Input
                                                            label={`Masukkan nama lengkap`}
                                                            value={nama_lengkap}
                                                            onChange={(e) => setNamaLengkap(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Alamat
                                                        </span>
                                                        <Textarea
                                                            label={`Masukkan alamat`}
                                                            value={alamat}
                                                            onChange={(e) => setAlamat(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Nomor HP
                                                        </span>
                                                        <div className="flex items-center">
                                                            <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                                                +62
                                                            </span>
                                                            <Input
                                                                type="number"
                                                                label={`Masukkan no hp`}
                                                                value={nomor_hp}
                                                                placeholder="8892384434"
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    if (inputValue.startsWith('0')) {
                                                                        setNomorHp(inputValue.slice(1));
                                                                    } else {
                                                                        setNomorHp(inputValue);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
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
                                            </div>
                                        </CardHeader>
                                    </form>
                                </Card>
                                <Card className="w-full h-full mb-10">
                                    <form
                                        action='post'
                                        method='post'
                                        onSubmit={(e) => handleEmailChangeAdmin(e, {
                                            email,
                                            token,
                                            setLoadingEmail,
                                            setError: setEmailError,
                                            setOtpSent,
                                            setOtpPopupVisible,
                                            setServerOtp
                                        })}>
                                        <CardHeader floated={false} shadow={false} className="rounded-none">
                                            <div className="mb-4 flex flex-col justify-between gap-4">
                                                <span className="text-black font-medium">
                                                    Ubah Email
                                                </span>
                                                <div className="border-t border-[#969696] w-full"></div>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Email
                                                        </span>
                                                        <Input
                                                            type='email'
                                                            label={`Masukkan email`}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <span className="text-[#6B7280] text-xs">
                                                            Email akan berubah ketika Anda sudah memasukkan kode OTP
                                                            untuk verifikasi yang dikirimkan ke email baru Anda.
                                                        </span>
                                                        {emailError && <span className="text-red-500 text-xs">{emailError}</span>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        type="submit"
                                                        className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        loading={loadingEmail}
                                                    >
                                                        {loadingEmail ? 'Mengirim OTP...' : 'Ubah Email'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </form>
                                    {otpSent && (
                                        <OTPPopup
                                            isOpen={otpPopupVisible}
                                            onVerify={handleOtpVerify}
                                            onClose={() => setOtpPopupVisible(false)}
                                            email={email}
                                            token={token}
                                            id={user.id}
                                            serverOtp={serverOtp}
                                            setUser={(user) => console.log(user)}
                                            setShowNotification={setShowNotification}
                                            setOtpPopupVisible={setOtpPopupVisible}
                                            setErrorOtp={setEmailError}
                                        />
                                    )}
                                </Card>
                                <Card className="w-full h-full">
                                    <form
                                        action='post'
                                        method='post'
                                        onSubmit={(e) => handlePasswordResetAdmin(e, {
                                            password,
                                            confirmPassword,
                                            id,
                                            token,
                                            setError: setPasswordError,
                                            setLoadingPassword,
                                            setShowNotification,
                                            setUser
                                        })}                                    >
                                        <CardHeader floated={false} shadow={false} className="rounded-none">
                                            <div className="mb-4 flex flex-col justify-between gap-4">
                                                <span className="text-black font-medium">
                                                    Ubah Password
                                                </span>
                                                <div className="border-t border-[#969696] w-full"></div>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Password Baru
                                                        </span>
                                                        <div className="relative w-full">
                                                            <Input
                                                                type={showNewPassword ? 'text' : 'password'}
                                                                label={`Masukkan password baru`}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={toggleShowNewPassword}
                                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                                                            >
                                                                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                                                            </button>
                                                        </div>
                                                        {passwordError && <span className="text-red-500 text-xs">{passwordError}</span>}
                                                        <span className="text-[#6B7280] text-xs">
                                                            Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <span className="text-black">
                                                            Konfirmasi Password Baru
                                                        </span>
                                                        <div className="relative w-full">
                                                            <Input
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                label={`Konfirmasi password baru`}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={toggleShowConfirmPassword}
                                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                                                            >
                                                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        type="submit"
                                                        className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loadingPassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        loading={loadingPassword}
                                                    >
                                                        {loadingPassword ? 'Loading...' : 'Ubah Password'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </form>
                                </Card>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                        {showNotification && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Data berhasil ubah</span>
                                <MdDone className="ml-2 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default Page;