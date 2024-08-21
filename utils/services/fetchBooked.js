import Cookies from 'js-cookie';
import { updateStatusOnServer } from './updateStatusBooked';

export const fetchBooked = async (token) => {
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
            (item) => item.status_history === "Dipesan" && item.pengguna_id === parseInt(id)
        );

        const today = new Date().toISOString().split('T')[0];

        for (const item of filteredData) {
            if (item.tanggal_mulai === today) {
                await updateStatusOnServer(item.id, "Sedang Digunakan", token);
            }
        }

        const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const updatedData = await updatedResponse.json();

        const updatedFilteredData = updatedData.history.filter(
            (item) => item.status_history === "Dipesan" && item.pengguna_id === parseInt(id)
        );

        return updatedFilteredData;
    } catch (error) {
        console.error('Failed to fetch booked details:', error);
        throw error;
    }
};
