export const handlePaymentAndReschedule = async ({
    historyId,
    token,
    tanggal_mulai,
    tanggal_selesai,
    handleRescheduleAndNotify,
    showNotificationWithTimeout,
    showNotificationWithTimeoutCancel,
    setIsLoading
}) => {
    try {
        const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-reschedule/${historyId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                total_pembayaran: 50000,
                reschedule: `${tanggal_mulai} - ${tanggal_selesai}`
            })
        });

        if (!paymentResponse.ok) {
            throw new Error('Failed to initiate payment');
        }

        const paymentData = await paymentResponse.json();

        if (paymentData.status === 200 && paymentData.snapToken) {
            window.snap.pay(paymentData.snapToken, {
                onSuccess: async () => {
                    await handleRescheduleAndNotify();
                    showNotificationWithTimeout('Penjadwalan Ulang Berhasil!', 'success');
                },
                onPending: () => {
                    showNotificationWithTimeoutCancel('Menunggu pembayaran Anda.', 'info');
                    setIsLoading(false);
                },
                onError: () => {
                    showNotificationWithTimeoutCancel('Pembayaran dibatalkan.', 'error');
                    setIsLoading(false);
                },
                onClose: () => {
                    showNotificationWithTimeoutCancel('Anda menutup popup tanpa menyelesaikan pembayaran.', 'warning');
                    setIsLoading(false);
                }
            });
        } else {
            throw new Error('Failed to retrieve snapToken or invalid status from payment API');
        }
    } catch (error) {
        console.error(error);
        showNotificationWithTimeoutCancel('Terjadi kesalahan saat mengirim data.', 'error');
        setIsLoading(false);
    }
};
