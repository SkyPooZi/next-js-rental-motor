import Cookies from 'js-cookie';
import { updateStatusOnServer } from './updateStatusBooked';

export const fetchInUse = async (token) => {
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
            (item) => item.status_history === "Sedang Digunakan" && item.pengguna_id === parseInt(id)
        );

        const today = new Date().toISOString().split('T')[0];

        for (const item of filteredData) {
            if (item.tanggal_selesai === today) {
                await updateStatusOnServer(item.id, "Selesai", token);
            }
        }

        const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const updateData = await updateResponse.json();

        const updatedFilteredData = updateData.history.filter(
            (item) => item.status_history === "Sedang Digunakan" && item.pengguna_id === parseInt(id)
        );

        return updatedFilteredData;
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        throw error;
    }
};