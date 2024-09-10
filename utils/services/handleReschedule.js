export const handleReschedule = async (token, historyId, email, nama_lengkap, tanggalMulai, tanggalSelesai) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${historyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                tanggal_mulai: tanggalMulai,
                tanggal_selesai: tanggalSelesai,
            }),
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
        const ownerNumber = data.user.nomor_hp === null ? '62' : data.user.nomor_hp;

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

        if (!sendNotif.ok) {
            throw new Error('Failed to send notification');
        }

        await sendNotif.json();

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        return { success: false, error };
    }
};
