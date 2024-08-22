export const fetchPaymentWait = async (token, id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered/status?filter=Menunggu Pembayaran`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();

        const filteredData = data.history.filter(
            (item) => item.pengguna_id === parseInt(id) && item.alasan_pembatalan === null
        );
        console.log(filteredData);
        return filteredData;
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        throw error;
    }
};