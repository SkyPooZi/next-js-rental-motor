export const fetchSewaData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const { history } = responseData;
        console.log('History Data:', history);

        const filteredHistory = history.filter(item => item.status_history !== 'Menunggu Pembayaran' && item.status_history !== 'Dibatalkan');

        const totalKeuntungan = history.reduce((sum, item) => sum + item.total_pembayaran, 0);
        console.log('Total Pembayaran:', totalKeuntungan);

        return {
            filteredHistory,
            totalKeuntungan,
            totalSewa: filteredHistory.length
        };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
