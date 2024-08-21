import Cookies from 'js-cookie';

export const fetchCancelled = async (token) => {
    try {
        const id = Cookies.get('id');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();

        const filteredData = data.history.filter(
            (item) => item.status_history === "Dibatalkan" && item.pengguna_id === parseInt(id) && item.alasan_pembatalan !== null
        );

        return filteredData;
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        throw error;
    }
};