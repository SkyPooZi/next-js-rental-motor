export const fetchCancelled = async (token, id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered/status?filter=Dibatalkan`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();

        const filteredData = data.history.filter(
            (item) => item.pengguna_id === parseInt(id) && item.alasan_pembatalan !== null
        );

        return filteredData;
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        throw error;
    }
};