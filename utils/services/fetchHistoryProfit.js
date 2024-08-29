export const fetchSewaData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered?filter=1_bulan`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        // Access the data array
        const history = responseData.data;
        console.log('History Data:', history);

        // Filter the history array
        const filteredHistory = history.filter(item => item.status_history !== 'Menunggu Pembayaran' && item.status_history !== 'Dibatalkan');
        console.log('Filtered History:', filteredHistory);

        // Calculate total pembayaran
        const totalKeuntungan = filteredHistory.reduce((sum, item) => sum + item.total_pembayaran, 0);
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
