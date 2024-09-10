export const handleConfirmReschedule = async ({
    historyId,
    token,
    durasi,
    beforeDurasi,
    initialDuration,
    handleRescheduleAndNotify,
    handlePaymentAndReschedule,
    showNotificationWithTimeout,
    showNotificationWithTimeoutCancel,
    setIsLoading
}) => {
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
            await handleRescheduleAndNotify();
        } else {
            await handlePaymentAndReschedule({
                historyId,
                token,
                tanggal_mulai: rescheduleData.history.tanggal_mulai,
                tanggal_selesai: rescheduleData.history.tanggal_selesai,
                handleRescheduleAndNotify,
                showNotificationWithTimeout,
                showNotificationWithTimeoutCancel,
                setIsLoading
            });

            await editKeuanganIfMidtransActive(historyId, token);
        }
    } catch (error) {
        console.error(error);
        showNotificationWithTimeoutCancel('Terjadi kesalahan saat memproses permintaan Anda.', 'error');
        setIsLoading(false);
    }
};

const editKeuanganIfMidtransActive = async (historyId, token) => {
    try {
        const keuanganResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!keuanganResponse.ok) {
            throw new Error('Failed to fetch keuangan data');
        }

        const keuanganData = await keuanganResponse.json();

        const matchedKeuangan = keuanganData.find(
            (keuangan) => keuangan.history_id === historyId
        );

        if (matchedKeuangan) {
            const keuanganId = matchedKeuangan.id;

            const editResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/edit/${keuanganId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    total_biaya_reschedule: 50000,
                }),
            });

            if (!editResponse.ok) {
                throw new Error('Failed to update keuangan');
            }

            console.log('Keuangan updated successfully');
        } else {
            console.log('No matching keuangan entry found for this historyId');
        }
    } catch (error) {
        console.error('Error in editKeuanganIfMidtransActive:', error);
    }
};
