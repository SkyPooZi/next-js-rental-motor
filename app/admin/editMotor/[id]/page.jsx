'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from "next/image";
import { MdDone } from "react-icons/md";
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/sub/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";
import Loading from '@/components/ui/loading';
import EditMotorForm from '@/components/sub/editMotor';
import { fetchMotor } from '@/utils/services/motorsService';
import { fetchMotorDetail } from '@/utils/services/fetchMotorDetail';
import { updateMotor } from '@/utils/services/handleEditMotor';
import { fetchBookedDatesAdmin } from '@/utils/services/bookedDates';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const Page = ({ params: { id } }) => {
    const [motor, setMotor] = useState(null);
    const [motors, setMotors] = useState([]);
    const [disabledDays, setDisabledDays] = useState([]);
    const [disabledTimesPerDay, setDisabledTimesPerDay] = useState({});
    const [minEndDate, setMinEndDate] = useState(null);
    const [tanggal_mulai_tidak_tersedia, setTanggalMulai] = useState(null);
    const [tanggal_selesai_tidak_tersedia, setTanggalSelesai] = useState(null);
    const [selectedMotor, setSelectedMotor] = useState('');
    const [nama_motor, setNamaMotor] = useState('');
    const [tipe_motor, setTipeMotor] = useState('');
    const [merk_motor, setMerkMotor] = useState('');
    const [stok_motor, setStokMotor] = useState('');
    const [motor_id, setMotorId] = useState('');
    const [harga_motor_per_1_hari, setHargaMotorPer1Hari] = useState('');
    const [harga_motor_per_1_minggu, setHargaMotorPer1Minggu] = useState('');
    const [status_motor, setStatusMotor] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const router = useRouter();
    const token = Cookies.get("token");

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

    const handleSelectChangeStatus = (value) => {
        setStatusMotor(value);
    };

    const handleSelectChangeType = (value) => {
        setTipeMotor(value);
    }

    const handleSelectChangeNamaMotor = (value) => {
        setNamaMotor(value);
    }

    useEffect(() => {
        fetchMotor(token, setMotors, setError, setLoadData);
    }, []);

    useEffect(() => {
        const loadMotorDetail = async () => {
            const result = await fetchMotorDetail(id, token);

            if (result.error) {
                setError(result.error);
            } else {
                const motorData = result.data;
                setMotor(motorData);
                setImage(result.imageUrl);
                setNamaMotor(motorData.nama_motor); // Initialize nama_motor state
                setTipeMotor(motorData.tipe_motor); // Initialize tipe_motor state
                setMerkMotor(motorData.merk_motor); // Initialize merk_motor state
                setStokMotor(motorData.stok_motor); // Initialize stok_motor state
                setHargaMotorPer1Hari(motorData.harga_motor_per_1_hari); // Initialize harga_motor_per_1_hari state
                setHargaMotorPer1Minggu(motorData.harga_motor_per_1_minggu); // Initialize harga_motor_per_1_minggu state
                setStatusMotor(motorData.status_motor); // Initialize status_motor state
                setTanggalMulai(motorData.tanggal_mulai_tidak_tersedia); // Initialize tanggal_mulai_tidak_tersedia state
                setTanggalSelesai(motorData.tanggal_selesai_tidak_tersedia); // Initialize tanggal_selesai_tidak_tersedia state
            }
            setLoadData(false);
        };

        loadMotorDetail();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await updateMotor({
                id,
                file,
                nama_motor,
                tipe_motor,
                merk_motor,
                stok_motor,
                harga_motor_per_1_hari,
                harga_motor_per_1_minggu,
                status_motor,
                tanggal_mulai_tidak_tersedia,
                tanggal_selesai_tidak_tersedia,
                token
            });

            console.log('Updated data:', data);
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.listMotor.gambar_motor}`);
            setShowNotification(true);

            setMotor((prevMotor) => ({
                ...prevMotor,
                ...(nama_motor && { nama_motor: data.listMotor.nama_motor }),
                ...(tipe_motor && { tipe_motor: data.listMotor.tipe_motor }),
                ...(merk_motor && { merk_motor: data.listMotor.merk_motor }),
                ...(stok_motor && { stok_motor: data.listMotor.stok_motor }),
                ...(harga_motor_per_1_hari && { harga_motor_per_1_hari: data.listMotor.harga_motor_per_1_hari }),
                ...(harga_motor_per_1_minggu && { harga_motor_per_1_minggu: data.listMotor.harga_motor_per_1_minggu }),
                ...(status_motor && { status_motor: data.listMotor.status_motor }),
                ...(tanggal_mulai_tidak_tersedia && { tanggal_mulai_tidak_tersedia: data.listMotor.tanggal_mulai_tidak_tersedia }),
                ...(tanggal_selesai_tidak_tersedia && { tanggal_selesai_tidak_tersedia: data.listMotor.tanggal_selesai_tidak_tersedia }),
            }));

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && motors.length > 0) {
            const motor = motors.find((m) => m.id === parseInt(id, 10)); // Ensure both are numbers
            if (motor) {
                setSelectedMotor(motor.nama_motor);
                setMotorId(motor.id);
                setNamaMotor(motor.nama_motor);
            }
        }
    }, [id, motors]);

    useEffect(() => {
        const getBookedDates = async () => {
            try {
                const { disabledDays, disabledTimesPerDay } = await fetchBookedDatesAdmin(motor_id, token, stok_motor);
                setDisabledDays(disabledDays || []); // Default to empty array if undefined
                setDisabledTimesPerDay(disabledTimesPerDay || {}); // Default to empty object if undefined
            } catch (error) {
                console.error('Failed to fetch booked dates:', error);
            }
        };

        if (motor_id && token && stok_motor) {
            getBookedDates();
        }
    }, [motor_id, token, stok_motor]);

    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');
        if (date.isBefore(today)) return true;

        // Ensure disabledDays is defined and is an array
        const dateStr = date.format('YYYY-MM-DD');
        return Array.isArray(disabledDays) && disabledDays.includes(dateStr);
    };

    const shouldDisableTime = (time, selectedDate) => {
        if (!selectedDate) return false;

        const now = dayjs();
        const dateStr = selectedDate.format('YYYY-MM-DD');
        const timeStr = selectedDate.set('hour', time.hour()).set('minute', time.minute()).format('YYYY-MM-DD HH:mm:ss');

        // Check if the selected date is today and the time is within 2 hours of the current time
        if (selectedDate.isSame(now, 'day') && time.isBefore(now.add(2, 'hour'), 'minute')) {
            return true;
        }

        // Check for the 2-hour buffer around booked times
        const bookedTimes = Array.from(disabledTimesPerDay[dateStr] || []);
        for (let bookedTimeStr of bookedTimes) {
            const bookedTime = dayjs(bookedTimeStr);
            const startBuffer = bookedTime.subtract(2, 'hour');
            const endBuffer = bookedTime.add(2, 'hour');
            if (time.isBetween(startBuffer, endBuffer, null, '[)')) {
                return true;
            }
        }

        return false;
    };

    const handleDateStart = (date) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
            setTanggalMulai(formattedDate);
            setTanggalSelesai('');
            setMinEndDate(dayjs(date).add(1, 'day'));
        } else {
            setTanggalMulai('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
            setTanggalSelesai(formattedDate);
        } else {
            setTanggalSelesai('');
        }
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

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
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Daftar Motor</p>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Edit
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Edit</h6>
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
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : motor ? (
                            <EditMotorForm
                                handleSubmit={handleSubmit}
                                handleImageChange={handleImageChange}
                                handleButtonClick={handleButtonClick}
                                fileInputRef={fileInputRef}
                                imagePreview={imagePreview}
                                image={image}
                                motor={motor}
                                motors={motors}
                                handleSelectChangeNamaMotor={handleSelectChangeNamaMotor}
                                handleSelectChangeType={handleSelectChangeType}
                                setNamaMotor={setNamaMotor}
                                setMerkMotor={setMerkMotor}
                                setStokMotor={setStokMotor}
                                setHargaMotorPer1Hari={setHargaMotorPer1Hari}
                                setHargaMotorPer1Minggu={setHargaMotorPer1Minggu}
                                handleSelectChangeStatus={handleSelectChangeStatus}
                                loading={loading}
                                nama_motor={nama_motor}
                                tipe_motor={tipe_motor}
                                merk_motor={merk_motor}
                                stok_motor={stok_motor}
                                harga_motor_per_1_hari={harga_motor_per_1_hari}
                                harga_motor_per_1_minggu={harga_motor_per_1_minggu}
                                status_motor={status_motor}
                                tanggal_mulai_tidak_tersedia={tanggal_mulai_tidak_tersedia}
                                tanggal_selesai_tidak_tersedia={tanggal_selesai_tidak_tersedia}
                                handleDateStart={handleDateStart}
                                handleDateEnd={handleDateEnd}
                                shouldDisableDate={shouldDisableDate}
                                shouldDisableTime={shouldDisableTime}
                                minEndDate={minEndDate}
                                setStatusMotor={setStatusMotor}
                                token={token}
                                id={id}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        {showNotification && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Data berhasil dikirim</span>
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