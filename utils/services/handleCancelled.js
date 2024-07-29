export const handleCancelled = async (token, historyId, alasanPembatalan, tanggalPembatalan) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${historyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                alasan_pembatalan: alasanPembatalan,
                tanggal_pembatalan: tanggalPembatalan,
                status_history: 'Dibatalkan',
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
