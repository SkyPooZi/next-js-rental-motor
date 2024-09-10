import { fetchUserPoint } from "./userService";

export const handleBookingSubmit = async (
    bookingData,
    token,
    router,
    setLoading,
    showNotificationWithTimeout,
    updateHistoryStatus,
    submitForm,
    setResponse,
    id,
    totalHargaMotor,
    totalBiayaDiskon,
    totalBiayaAdmin,
) => {
    const {
        metode_pembayaran,
        pengguna_id,
        nama_lengkap,
        email,
        nomor_hp,
        akun_sosmed,
        alamat,
        penyewa,
        motor_id,
        tanggal_mulai,
        tanggal_selesai,
        durasi,
        keperluan_menyewa,
        penerimaan_motor,
        nama_kontak_darurat,
        nomor_kontak_darurat,
        hubungan_dengan_kontak_darurat,
        diskon_id,
        total_pembayaran,
        usePoint,
        point,
    } = bookingData;

    if (metode_pembayaran === 'Tunai') {
        await submitForm('Booking berhasil');
        return;
    }

    if (nama_kontak_darurat.trim().toLowerCase() === nama_lengkap.trim().toLowerCase()) {
        showNotificationWithTimeout('Nama kontak darurat tidak boleh sama dengan nama pemesan', 'error');
        return;
    }

    if (nomor_kontak_darurat.trim().toLowerCase() === nomor_hp.trim().toLowerCase()) {
        showNotificationWithTimeout('Nomor kontak darurat tidak boleh sama dengan nomor hp pemesan', 'error');
        return;
    }

    setLoading(true);

    try {
        const pointsToUse = usePoint ? Math.min(point, total_pembayaran) : 0;

        const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pengguna_id,
                nama_lengkap,
                email,
                nomor_hp,
                akun_sosmed,
                alamat,
                penyewa,
                motor_id,
                tanggal_mulai,
                tanggal_selesai,
                durasi,
                keperluan_menyewa,
                penerimaan_motor,
                nama_kontak_darurat,
                nomor_kontak_darurat,
                hubungan_dengan_kontak_darurat,
                diskon_id,
                metode_pembayaran,
                total_pembayaran,
                status_history: 'Menunggu Pembayaran',
                point: pointsToUse,
            }),
        });

        if (!historyResponse.ok) {
            const errorText = await historyResponse.text();
            throw new Error(`Failed to create history: ${errorText}`);
        }

        if (!historyResponse === 422) {
            showNotificationWithTimeout('Data yang dimasukkan tidak valid', 'error');
            return;
        }

        const historyData = await historyResponse.json();
        const historyId = historyData.history.id;

        const userData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!userData.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await userData.json();
        const ownerNumber = data.user.nomor_hp === null ? '62' : '62';

        const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/${historyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!paymentResponse.ok) {
            const errorText = await paymentResponse.text();
            throw new Error(`Failed to get payment details: ${errorText}`);
        }

        const paymentData = await paymentResponse.json();
        const snapToken = paymentData.snapToken;
        const orderId = paymentData.order_id;

        if (!snapToken || !orderId) {
            throw new Error('Snap Token or Order ID missing in the response');
        }

        const currentDate = new Date().toISOString().split('T')[0];

        window.snap.pay(snapToken, {
            onSuccess: async function (result) {
                showNotificationWithTimeout('Pembayaran berhasil!', 'success');
                await updateHistoryStatus(historyData.history.id, 'Dipesan', null, null);
                console.log(orderId)

                try {
                    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-invoice/${orderId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            status_pembayaran: 'Lunas',
                        }),
                    });

                    const updateHistoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${historyId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ status_history: 'Dipesan' }),
                    });

                    const updateDataKeuangan = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            history_id: historyId,
                            total_harga_motor: totalHargaMotor,
                            total_biaya_overtime: 0,
                            total_biaya_diantar: 25000,
                            total_potongan_point: pointsToUse,
                            total_biaya_diskon: totalBiayaDiskon,
                            total_biaya_admin: totalBiayaAdmin,
                            total_pembayaran: total_pembayaran,
                        })
                    });

                    const sendNotif = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-notification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            history_id: historyId,
                            pesan: `Halo, ${nama_lengkap}!`,
                            no_telp: ownerNumber,
                            email: email,
                        })
                    });

                    if (!updateResponse.ok || !updateHistoryResponse.ok || !updateDataKeuangan.ok) {
                        throw new Error('Failed to update invoice status');
                    }

                    await updateResponse.json();
                    await updateHistoryResponse.json();
                    await updateDataKeuangan.json();
                    console.log('success update invoice status');
                    await sendNotif.json();

                    if (usePoint) {
                        const pointsToUse = Math.min(point, total_pembayaran);
                        console.log(pointsToUse);
                        const pointResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ point: point - pointsToUse }),
                        });

                        console.log(pointResponse);

                        if (!pointResponse.ok) {
                            throw new Error('Failed to update points');
                        }

                        console.log(`Points updated successfully: ${point} - ${pointsToUse} for user ${id}`);
                    }

                    router.push(`/setting?component=history`);
                } catch (error) {
                    console.error('Error updating invoice or points:', error);
                }

            },
            onPending: async function (result) {
                showNotificationWithTimeout('Menunggu pembayaran Anda.', 'info');
                await updateHistoryStatus(historyData.history.id, 'Menunggu Pembayaran', null, null);
            },
            onError: async function (result) {
                showNotificationWithTimeout('Pembayaran dibatalkan.', 'error');
                await updateHistoryStatus(historyData.history.id, 'Dibatalkan', "Dibatalkan oleh pengguna", currentDate);
            },
            onClose: async function () {
                showNotificationWithTimeout('Anda menutup popup tanpa menyelesaikan pembayaran.', 'warning');
                await updateHistoryStatus(historyData.history.id, 'Dibatalkan', "Dibatalkan oleh pengguna", currentDate);
            }
        });

    } catch (error) {
        showNotificationWithTimeout('Terjadi kesalahan saat mengirim data.', 'error');
        console.error('Error:', error);
        setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error: error.message });
    } finally {
        setLoading(false);
    }
};
