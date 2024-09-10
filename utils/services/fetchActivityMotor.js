export const fetchActivityMotor = async (token, motorId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/riwayat-data/detail-list-motor/${motorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        throw error;
    }
};