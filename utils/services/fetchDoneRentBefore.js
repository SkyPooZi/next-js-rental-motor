import Cookies from 'js-cookie';

export const fetchDoneRentBefore = async (token) => {
    try {
        const id = Cookies.get('id');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const filteredData = data.history.filter(
            (item) => item.status_history === "Selesai" && item.pengguna_id === parseInt(id) && item.ulasan === null
        );

        return filteredData;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error;
    }
};