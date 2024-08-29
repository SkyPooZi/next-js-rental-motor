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
) => {
    const {
        metode_pembayaran,
        pengguna_id,
        nama_lengkap,
        email,
        no_telp,
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
        point
    } = bookingData;

    if (metode_pembayaran === 'Tunai') {
        await submitForm('Booking berhasil');
        return;
    }

    setLoading(true);

    try {
        // Create history entry
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
                no_telp,
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
            }),
        });

        if (!historyResponse.ok) {
            const errorText = await historyResponse.text();
            throw new Error(`Failed to create history: ${errorText}`);
        }

        const historyData = await historyResponse.json();
        const historyId = historyData.history.id;

        // Get payment details
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

        // Process payment
        window.snap.pay(snapToken, {
            onSuccess: async function (result) {
                showNotificationWithTimeout('Pembayaran berhasil!', 'success');
                await updateHistoryStatus(historyData.history.id, 'Dipesan');

                try {
                    // Update invoice status
                    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-invoice/${orderId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            status_history: 'Dipesan',
                            status_pembayaran: 'Lunas',
                        }),
                    });

                    if (!updateResponse.ok) {
                        throw new Error('Failed to update invoice status');
                    }

                    await updateResponse.json();

                    // Deduct points if applicable
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

                    // Redirect after success
                    router.push(`/setting?component=history`);
                } catch (error) {
                    console.error('Error updating invoice or points:', error);
                }

            },
            onPending: async function (result) {
                showNotificationWithTimeout('Menunggu pembayaran Anda.', 'info');
                await updateHistoryStatus(historyData.history.id, 'Menunggu Pembayaran');
            },
            onError: async function (result) {
                showNotificationWithTimeout('Pembayaran dibatalkan.', 'error');
                await updateHistoryStatus(historyData.history.id, 'Dibatalkan');
            },
            onClose: async function () {
                showNotificationWithTimeout('Anda menutup popup tanpa menyelesaikan pembayaran.', 'warning');
                await updateHistoryStatus(historyData.history.id, 'Dibatalkan');
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
