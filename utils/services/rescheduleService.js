export const handleConfirmReschedule = async ({
    historyId,
    token,
    durasi,
    beforeDurasi,
    initialDuration,
    nama_lengkap,
    email,
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

            await editKeuanganIfMidtransActive(historyId, token, nama_lengkap, email);
        }
    } catch (error) {
        console.error(error);
        showNotificationWithTimeoutCancel('Terjadi kesalahan saat memproses permintaan Anda.', 'error');
        setIsLoading(false);
    }
};

const editKeuanganIfMidtransActive = async (historyId, token, nama_lengkap, email) => {
    try {
        const keuanganResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

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
        const ownerNumber = data.user.nomor_hp;

        if (!keuanganResponse.ok) {
            throw new Error('Failed to fetch keuangan data');
        }

        const keuanganData = await keuanganResponse.json();

        // Log the full keuangan data for debugging purposes
        console.log('keuanganData:', keuanganData);

        // Access the 'keuangan' array from the response object
        if (Array.isArray(keuanganData.keuangan)) {
            const matchedKeuangan = keuanganData.keuangan.find(
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

                await editResponse.json();
                await sendNotif.json();
                console.log('works');

                if (!editResponse.ok) {
                    throw new Error('Failed to update keuangan');
                }

                console.log('Keuangan updated successfully');
            } else {
                console.log('No matching keuangan entry found for this historyId');
            }
        } else {
            console.error('keuanganData.keuangan is not an array:', keuanganData.keuangan);
        }
    } catch (error) {
        console.error('Error in editKeuanganIfMidtransActive:', error);
    }
};

