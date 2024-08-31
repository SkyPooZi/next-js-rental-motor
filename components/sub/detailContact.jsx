import React, { useState, useEffect, useRef } from 'react';
import { Input, Radio } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const DetailKontak = ({
    nama_lengkap,
    setNamaLengkap,
    akun_sosmed,
    setAkunSosmed,
    email,
    setEmail,
    nomor_hp,
    setNoTelp,
    clickedPenyewaDiriSendiri,
    handleClickPenyewaDiriSendiri,
    clickedPenyewaOrangLain,
    handleClickPenyewaOrangLain,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(<FaInstagram className="text-pink-500" />);
    const dropdownRef = useRef(null); // Ref for the dropdown

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const selectIcon = (icon) => {
        setSelectedIcon(icon);
        setShowDropdown(false);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className='w-full rounded-xl px-5 py-5 bg-white'>
            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                <Label>
                    <span className='font-extrabold text-black text-lg'>
                        Detail Kontak
                    </span>
                </Label>
                <span className='text-[#FF4D30] text-[14px]'>
                    Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                </span>
            </div>
            <div className='mt-10'>
                <div className='flex flex-col gap-8'>
                    <div className="flex md:flex-row flex-col gap-5 w-full">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Lengkap <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                label="Masukkan nama lengkap"
                                value={nama_lengkap}
                                onChange={(e) => setNamaLengkap(e.target.value)}
                                required
                            />
                        </div>
                        {/* Social Media Account Input */}
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Akun Sosial Media <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <div className="relative flex items-center">
                                <button
                                    className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l"
                                    onClick={toggleDropdown}
                                >
                                    {selectedIcon}
                                </button>
                                <Input
                                    label="Masukkan akun sosmed"
                                    value={akun_sosmed}
                                    onChange={(e) => setAkunSosmed(e.target.value)}
                                    required
                                    className="border rounded-r"
                                />
                                {showDropdown && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute bg-white border border-gray-300 shadow-lg rounded-lg mt-2 w-36 z-10"
                                    >
                                        <ul>
                                            <li
                                                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => selectIcon(<FaInstagram className="text-pink-500" />)}
                                            >
                                                <FaInstagram className="text-pink-500 mr-2" />
                                                Instagram
                                            </li>
                                            <li
                                                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => selectIcon(<FaFacebookF className="text-blue-600" />)}
                                            >
                                                <FaFacebookF className="text-blue-600 mr-2" />
                                                Facebook
                                            </li>
                                            <li
                                                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => selectIcon(<FaTwitter className="text-blue-400" />)}
                                            >
                                                <FaTwitter className="text-blue-400 mr-2" />
                                                Twitter
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {/* Helper text for Social Media Input */}
                            <span className="text-[12px] text-gray-500 text-right">
                                Masukkan URL profil akun Anda
                            </span>
                        </div>
                    </div>
                </div>


                <div className='flex md:flex-row flex-col gap-5 '>
                    <div className='w-full flex flex-col gap-2'>
                        <span className="text-black">
                            Email <span className="text-[#FF4D33] font-semibold">*</span>
                        </span>
                        <Input
                            type='email'
                            label="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <span className="text-black">
                            Nomor Telepon <span className="text-[#FF4D33] font-semibold">*</span>
                        </span>
                        <div className="flex items-center">
                            <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                                +62
                            </span>
                            <Input
                                type="number"
                                label="Masukkan no telp"
                                placeholder="8892384434"
                                value={nomor_hp}
                                onChange={(e) => {
                                    let inputValue = e.target.value;

                                    if (inputValue.startsWith('0')) {
                                        inputValue = inputValue.slice(1); // Remove the leading "0"
                                    }

                                    setNoTelp(inputValue);
                                }}
                                required
                                className="border rounded-r"
                            />
                        </div>
                        <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className={`flex flex-row items-center cursor-pointer`}>
                        <Radio
                            checked={clickedPenyewaDiriSendiri}
                            onChange={handleClickPenyewaDiriSendiri}
                        />
                        Diri Sendiri
                    </div>
                    <div className={`flex flex-row items-center cursor-pointer`}>
                        <Radio
                            checked={clickedPenyewaOrangLain}
                            onChange={handleClickPenyewaOrangLain}
                        />
                        Orang Lain
                    </div>
                </div>
                <span className='text-[#757575] text-[14px]'>
                    Anda bisa memesan motor untuk orang lain dengan memilih opsi "Untuk Orang Lain"
                </span>
            </div>
        </div>
    );
};

export default DetailKontak;
