export const handleConfirmReschedule = async ({
    historyId,
    token,
    durasi,
    initialDuration,
    handleRescheduleAndNotify,
    handlePaymentAndReschedule,
    showNotificationWithTimeout,
    showNotificationWithTimeoutCancel,
    setIsLoading
}) => {
    if (durasi !== initialDuration) {
        alert('Durasi penjadwalan ulang harus sama dengan durasi pesanan sebelumnya.');
        return;
    }

    setIsLoading(true);

    try {
        const rescheduleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/detail/${historyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!rescheduleResponse.ok) {
            throw new Error('Failed to fetch the reschedule data');
        }

        const rescheduleData = await rescheduleResponse.json();
        const createAtDateStr = rescheduleData.history.created_at.split('T')[0];
        const todayDateStr = new Date().toISOString().split('T')[0];

        const isSameDay = createAtDateStr === todayDateStr;

        if (isSameDay) {
            // Reschedule without payment
            await handleRescheduleAndNotify();
        } else {
            // Call handlePaymentAndReschedule if payment is required
            await handlePaymentAndReschedule({
                historyId,
                token,
                tanggal_mulai: rescheduleData.history.tanggal_mulai,  // Ensure correct parameters
                tanggal_selesai: rescheduleData.history.tanggal_selesai,
                handleRescheduleAndNotify,
                showNotificationWithTimeout,
                showNotificationWithTimeoutCancel,
                setIsLoading
            });
        }
    } catch (error) {
        console.error(error);
        showNotificationWithTimeoutCancel('Terjadi kesalahan saat memproses permintaan Anda.', 'error');
        setIsLoading(false);
    }
};
