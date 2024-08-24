"use client";

import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { MdDone } from "react-icons/md";

import {
    Input,
    Textarea
} from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchUserDetail } from '@/utils/services/fetchUserDetail';
import { handleSubmitProfile } from '@/utils/services/handleSubmitProfile';
import { handleSubmitPersonalData } from '@/utils/services/handleSubmitPersonalData';
import { handleEmailChange } from '@/utils/services/handleEmailChange';
import { handleVerifyOTP } from '@/utils/services/otpService';
import { handlePasswordReset } from '@/utils/services/handlePasswordReset';
import OTPPopup from '@/components/sub/admin/sendOTP';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormSection = ({ title, children, onSubmit, isLoading, submitText }) => (
    <form action="post" method="post" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5 bg-white py-5 px-5 rounded-md">
            <Label>
                <span className="font-medium text-base">{title}</span>
            </Label>
            <div className="border-t border-[#FF4D30]"></div>
            {children}
            <div className="w-full flex flex-row justify-end">
                <Button
                    type="submit"
                    className={`cursor-pointer capitalize ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    loading={isLoading}
                >
                    {isLoading ? 'Loading...' : submitText}
                </Button>
            </div>
        </div>
    </form>
);

export default function Profile() {
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nomor_hp, setNomorHp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [peran, setPeran] = useState('');
    const [error, setError] = useState(null);
    const [errorOtp, setErrorOtp] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPersonalData, setIsLoadingPersonalData] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [otpPopupVisible, setOtpPopupVisible] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [user, setUser] = useState({ email: '' });
    const [serverOtp, setServerOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    const formatPhoneNumber = (phone) => {
        // Ensure that the phone number starts with +62
        if (!phone.startsWith('+62')) {
            return '+62' + phone.replace(/^0+/, '');
        }
        return phone;
    };

    const handleOtpVerify = async (otp) => {
        await handleVerifyOTP(otp, {
            id: user.id,
            email,
            token,
            setErrorOtp: setError,
            setLoadingOtp: setLoadingEmail,
            setShowNotification,
            setUser: (user) => console.log(user),
            setOtpPopupVisible,
            serverOtp
        });
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

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };



    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const userData = await fetchUserDetail(id, token);
                setUser(userData);
            } catch (error) {
                setError(error.message);
            }
        };
        getUserDetail();
    }, [id, token]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <FormSection
                title="Profil Saya"
                onSubmit={(e) => handleSubmitProfile(e, { file, nama_lengkap, id, token, setIsLoadingProfile, setError, setImage, setShowNotification, setUser })}
                isLoading={isLoadingProfile}
                submitText="Simpan Perubahan"
            >
                <div className="flex flex-col gap-5">
                    <div className="mr-4">
                        <img
                            src={imagePreview || (user.google_id || user.facebook_id
                                ? user.gambar // Use the link directly from the response if google_id or facebook_id is not null
                                : `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.gambar}` // Use the local storage link if both are null
                            )}
                            alt="Image Preview"
                            className="max-w-36 h-auto rounded-md"
                        />
                    </div>
                    {!(user.google_id || user.facebook_id) && (
                        <div>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <Button type="button" onClick={handleButtonClick}>
                                <span className="font-medium text-xs">Pilih Foto</span>
                            </Button>
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <Label className='mb-1'>
                            <span>Nama Lengkap</span>
                        </Label>
                        <Input
                            label={`Masukkan nama lengkap anda (${user.nama_lengkap})`}
                            onChange={(e) => setNamaLengkap(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className='mb-1'>
                            <span>Email</span>
                        </Label>
                        <Input
                            type='email'
                            placeholder='Email Anda'
                            label={`(${user.email})`}
                            disabled
                        />
                    </div>
                </div>
            </FormSection>

            <FormSection
                title="Data Pribadi"
                onSubmit={(e) => handleSubmitPersonalData(e, { nomor_hp: formatPhoneNumber(nomor_hp), alamat, id, token, setIsLoadingPersonalData, setError, setShowNotification, setUser })}
                isLoading={isLoadingPersonalData}
                submitText="Simpan Perubahan"
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor='nomor_hp' className='mb-1'>
                        <span>No. Telepon</span>
                    </Label>
                    <Input
                        type="number"
                        label={`Masukkan no hp (${user.nomor_hp})`}
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
                    <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor='alamat' className='mb-1'>
                            <span>Alamat</span>
                        </Label>
                        <Textarea
                            label={`Masukkan alamat (${user.alamat})`}
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                    </div>
                </div>
            </FormSection>

            <FormSection
                title="Ubah Email"
                onSubmit={(e) => handleEmailChange(e, {
                    email,
                    token,
                    setLoadingEmail,
                    setError,
                    setOtpSent,
                    setOtpPopupVisible,
                    setServerOtp
                })}
                isLoading={loadingEmail}
                submitText="Ubah Email"
            >
                <div className="flex flex-col gap-2 mt-1">
                    <label className='mb-1'>
                        <span>Email Baru</span>
                    </label>
                    <Input
                        label={`Masukkan email`}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span className="text-[#6B7280] text-xs">
                        Email akan berubah ketika Anda sudah memasukkan kode OTP
                        untuk verifikasi yang dikirimkan ke email baru Anda.
                    </span>
                </div>
            </FormSection>

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
                    setErrorOtp={setError}
                />
            )}

            <FormSection
                title="Ubah Kata Sandi"
                onSubmit={(e) => handlePasswordReset(e, { password, confirmPassword, id, token, setError, setLoadingPassword, setShowNotification, setUser })}
                isLoading={loadingPassword}
                submitText="Ubah Kata Sandi"
            >
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1 mb-1">
                            <Label>
                                <span>Kata Sandi Baru</span>
                            </Label>
                            <Label>
                                <span className="text-[#FF4D30]">*</span>
                            </Label>
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label={`Masukkan kata sandi baru`}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {error && <span className="text-red-500 text-xs">{error}</span>}
                        <span className="text-[#6B7280] text-xs">
                            Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1 mb-1">
                            <Label>
                                <span>Konfirmasi Kata Sandi Baru</span>
                            </Label>
                            <Label>
                                <span className="text-[#FF4D30]">*</span>
                            </Label>
                        </div>
                        <div className="relative">
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
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                </div>
            </FormSection>
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                    <span>Data berhasil ubah</span>
                    <MdDone className="ml-2 text-white" />
                </div>
            )}
        </div>
    );
}