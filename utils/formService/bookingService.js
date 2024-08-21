// utils/service/bookingService.js

export const handleBookingSubmit = async (bookingData, token, setLoading, setShowInvoice, showNotificationWithTimeout, updateHistoryStatus, submitForm, setResponse, setError) => {
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
        id,
        usePoint,
        point
    } = bookingData;

    if (metode_pembayaran === 'Tunai') {
        await submitForm('Booking berhasil');
    } else {
        setLoading(true);

        try {
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
                console.error('Failed to create history:', errorText);
                throw new Error(`Failed to create history: ${errorText}`);
            }

            const historyData = await historyResponse.json();
            const historyId = historyData.history.id;
            console.log('History Data:', historyData);

            const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/${historyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!paymentResponse.ok) {
                const errorText = await paymentResponse.text();
                console.error('Failed to get payment details:', errorText);
                throw new Error(`Failed to get payment details: ${errorText}`);
            }

            const paymentData = await paymentResponse.json();
            const snapToken = paymentData.snapToken;
            const orderId = paymentData.order_id;
            console.log(`Snap Token: ${snapToken}, Order ID: ${historyId}`);

            if (!snapToken || !historyId) {
                throw new Error('Snap Token or Order ID missing in the response');
            }

            window.snap.pay(snapToken, {
                onSuccess: async function (result) {
                    showNotificationWithTimeout('Pembayaran berhasil!', 'success');
                    console.log('Payment Success:', result);
                    await updateHistoryStatus(historyData.history.id, 'Dipesan');

                    try {
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

                        const updateData = await updateResponse.json();
                        console.log('Invoice status update response:', updateData);

                    } catch (error) {
                        console.error('Error updating invoice status:', error);
                    }

                    if (usePoint) {
                        const pointsToUse = Math.min(point, total_pembayaran);
                        try {
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ point: point - pointsToUse }),
                            });

                            if (!response.ok) {
                                throw new Error('Failed to update points');
                            }

                            console.log(`Points updated successfully: ${point} - ${pointsToUse} for user ${id}`);
                        } catch (error) {
                            console.error('Error updating points:', error);
                        }
                    }
                    setShowInvoice(true);
                },
                onPending: async function (result) {
                    showNotificationWithTimeout('Menunggu pembayaran Anda.', 'info');
                    console.log('Payment Pending:', result);

                    await updateHistoryStatus(historyData.history.id, 'Menunggu Pembayaran');
                },
                onError: async function (result) {
                    showNotificationWithTimeout('Pembayaran dibatalkan.', 'error');
                    console.log('Payment Error:', result);

                    await updateHistoryStatus(historyData.history.id, 'Dibatalkan');
                },
                onClose: async function () {
                    showNotificationWithTimeout('Anda menutup popup tanpa menyelesaikan pembayaran.', 'warning');
                    console.log('Payment Popup Closed');

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
    }
};
