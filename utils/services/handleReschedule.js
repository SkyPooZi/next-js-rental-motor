export const handleReschedule = async (token, historyId, tanggalMulai, tanggalSelesai) => {
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
