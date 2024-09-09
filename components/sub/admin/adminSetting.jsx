import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, Option, Typography } from '@material-tailwind/react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { fetchBookedDates } from '@/utils/formService/bookedDates'; // Correct import path for the fetching function
import { fetchMotorDetail } from '@/utils/services/fetchMotorDetail'; // Correct import path
import { updateMotor } from '@/utils/services/handleEditMotor';

const AdminSetting = ({ motorId, token }) => {
    const router = useRouter();
    const [statusMotor, setStatusMotor] = useState('Tersedia');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [tanggalMulaiTidakTersedia, setTanggalMulaiTidakTersedia] = useState(null);
    const [tanggalSelesaiTidakTersedia, setTanggalSelesaiTidakTersedia] = useState(null);
    const [history, setHistory] = useState([]);
    const [motorDetails, setMotorDetails] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [response, setResponse] = useState(null);
    const [pengguna_id, setPenggunaId] = useState('');
    const [disabledDays, setDisabledDays] = useState([]); // Store disabled dates
    const [disabledTimesPerDay, setDisabledTimesPerDay] = useState({}); // Store disabled times per day
    const [file, setFile] = useState(''); // For file upload
    const Btoken = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        // Fetch pengguna_id from Cookies
        const penggunaIdFromCookie = Cookies.get('pengguna_id');
        if (penggunaIdFromCookie) {
            setPenggunaId(penggunaIdFromCookie);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Show loading state

        try {
            const formattedStartDate = tanggalMulaiTidakTersedia ? dayjs(tanggalMulaiTidakTersedia).format('YYYY-MM-DD HH:mm:ss') : null;
            const formattedEndDate = tanggalSelesaiTidakTersedia ? dayjs(tanggalSelesaiTidakTersedia).format('YYYY-MM-DD HH:mm:ss') : null;

            const updatedData = {
                id,  // Assuming the id is available in the scope
                pengguna_id,  // Ensure pengguna_id is available and not undefined
                status_motor: statusMotor,  // Ensure status_motor is provided
                tanggal_mulai_tidak_tersedia : formattedStartDate,
                tanggal_selesai_tidak_tersedia : formattedEndDate,
                token
            };

            // Call the updated API method
            const data = await updateMotor(updatedData);
            if(data){
                console.log(data)
            }
        } catch (err) {
            console.error('Error updating motor:', err);
            setResponse('Gagal memperbarui data. Silakan coba lagi.'); // Show error message
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    useEffect(() => {
        const fetchMotorData = async () => {
            try {
                // Fetch motor details
                const motorDetailResponse = await fetchMotorDetail(motorId, token);
                if (motorDetailResponse.error) {
                    console.error(motorDetailResponse.error);
                } else {
                    setMotorDetails(motorDetailResponse.data);
                    setImageUrl(motorDetailResponse.imageUrl); // Set the image URL
                }

                // Fetch history data
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Btoken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch history');
                }
                const data = await response.json();
                setHistory(data.history);

                // Fetch booked dates
                const { disabledDays, disabledTimesPerDay } = await fetchBookedDates(motorId, token, motorDetails.stok_motor);
                setDisabledDays(disabledDays);
                setDisabledTimesPerDay(disabledTimesPerDay);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMotorData();
    }, [motorId, token, motorDetails.stok_motor]);

    // Handle status change
    const handleSelectChangeStatus = (value) => {
        setStatusMotor(value);
        if (value === 'Tidak Tersedia') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };

    // Date disabling logic
    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');
        if (date.isBefore(today)) return true;

        const dateStr = date.format('YYYY-MM-DD');
        return disabledDays.includes(dateStr);
    };

    const shouldDisableTime = (time, selectedDate) => {
        if (!selectedDate) return false;

        const now = dayjs();
        const dateStr = selectedDate.format('YYYY-MM-DD');
        const timeStr = selectedDate.set('hour', time.hour()).set('minute', time.minute()).format('YYYY-MM-DD HH:mm:ss');

        if (selectedDate.isSame(now, 'day') && time.isBefore(now.add(2, 'hour'), 'minute')) {
            return true;
        }

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


    // Handle date changes
    const handleDateStart = (date) => {
        setTanggalMulaiTidakTersedia(date);
    };

    const handleDateEnd = (date) => {
        setTanggalSelesaiTidakTersedia(date);
    };

    return (
        <div className="w-full flex flex-col gap-4 p-12">
            {/* Motor details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Setting Motor</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    {imageUrl ? (
                        <img src={imageUrl} alt={motorDetails.nama_motor} className="w-32 h-32 object-cover rounded-md" />
                    ) : (
                        <p>Gambar sedang berproses...</p>
                    )}
                    <div>
                        <Typography variant="h6">{motorDetails.nama_motor}</Typography>
                        <Typography variant="body1">Status: {statusMotor}</Typography>
                        <Typography variant="body1">Stok: {motorDetails.stok_motor}</Typography>
                    </div>
                </div>
            </div>

            {/* History section */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Riwayat Sewa Motor</h2>
                {history.map((item) => (
                    <div key={item.id} className="border-b pb-4 mb-4">
                        <Typography variant="h6">{item.status_history}</Typography>
                        <Typography variant="h6">Nama Perental: {item.user.nama_lengkap}</Typography>
                        <Typography variant="body1">Email: {item.user.email}</Typography>
                        <Typography variant="body1">Nomor Telepon: {item.user.nomor_hp}</Typography>
                        <Typography variant="body1">Tanggal Mulai: {dayjs(item.tanggal_mulai).format('YYYY-MM-DD HH:mm')}</Typography>
                        <Typography variant="body1">Tanggal Selesai: {dayjs(item.tanggal_selesai).format('YYYY-MM-DD HH:mm')}</Typography>
                    </div>
                ))}
            </div>

            {/* Motor status and date selection */}
            <div className="w-full flex flex-col gap-2">
                <span className="text-black text-lg">
                    Status Motor <span className="text-[#FF4D33] font-semibold">*</span>
                </span>
                <Select label="Masukkan status motor" onChange={handleSelectChangeStatus} value={statusMotor} name="motorStatus">
                    <Option value="Tersedia" className="text-white mb-2 rounded-md w-full bg-green-400">Tersedia</Option>
                    <Option value="Tidak Tersedia" className="text-white rounded-md w-full bg-red-400">Tidak Tersedia</Option>
                </Select>

                {isChecked && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex md:flex-row flex-col gap-5">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Tanggal Mulai Tidak Tersedia <span className="text-[#FF4D33] font-semibold">*</span></span>
                                <DateTimePicker
                                    label="Pilih Tanggal Mulai"
                                    value={tanggalMulaiTidakTersedia ? dayjs(tanggalMulaiTidakTersedia) : null}
                                    onChange={handleDateStart}
                                    shouldDisableDate={shouldDisableDate}
                                    shouldDisableTime={(time) => shouldDisableTime(time, dayjs(tanggalMulaiTidakTersedia))}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Tanggal Selesai Tidak Tersedia <span className="text-[#FF4D33] font-semibold">*</span></span>
                                <DateTimePicker
                                    label="Pilih Tanggal Selesai"
                                    value={tanggalSelesaiTidakTersedia ? dayjs(tanggalSelesaiTidakTersedia) : null}
                                    onChange={handleDateEnd}
                                    shouldDisableDate={shouldDisableDate}
                                    shouldDisableTime={(time) => shouldDisableTime(time, dayjs(tanggalSelesaiTidakTersedia))}
                                    minDateTime={tanggalMulaiTidakTersedia}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </div>
                        </motion.div>
                    </LocalizationProvider>
                )}

                <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                    {loading ? 'Updating...' : 'Update Status'}
                </button>



                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    Pastikan Stok Sudah Habis Sebelum Mengubah Status Menjadi Tidak Tersedia
                </Typography>
            </div>
        </div>
    );
};

export default AdminSetting;
