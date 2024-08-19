// utils/service/formService.js

import dayjs from 'dayjs';

export const submitForms = async ({
    id,
    token,
    nama_lengkap,
    email,
    no_telp,
    akun_sosmed,
    alamat,
    penyewa,
    motor_id,
    tanggal_mulai,
    tanggal_selesai,
    keperluan_menyewa,
    penerimaan_motor,
    nama_kontak_darurat,
    nomor_kontak_darurat,
    hubungan_dengan_kontak_darurat,
    diskon_id,
    metode_pembayaran,
    total_pembayaran,
    setDurasi,
    setResponse,
    setLoading,
    showNotificationWithTimeout,
}, successMessage) => {

    if (tanggal_mulai && tanggal_selesai) {
        const startDate = dayjs(tanggal_mulai);
        const endDate = dayjs(tanggal_selesai);
        const duration = endDate.diff(startDate, 'day');
        setDurasi(duration);
    } else {
        setDurasi(0);
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pengguna_id: id,
                nama_lengkap,
                email,
                no_telp,
                akun_sosmed,
                alamat,
                penyewa,
                motor_id,
                tanggal_mulai,
                durasi,
                tanggal_selesai,
                keperluan_menyewa,
                penerimaan_motor,
                nama_kontak_darurat,
                nomor_kontak_darurat,
                hubungan_dengan_kontak_darurat,
                diskon_id,
                metode_pembayaran,
                total_pembayaran,
                status_history: 'Dipesan',
            }),
        });

        if (!response.ok) {
            throw new Error('Network Error');
        }

        const data = await response.json();
        console.log('Success', data);
        setResponse(data);

        showNotificationWithTimeout(successMessage, 'success');

        // router.push(`/payment-success?order_id=${data.id}`);
    } catch (error) {
        setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error: error.message });
    } finally {
        setLoading(false);
    }
};
