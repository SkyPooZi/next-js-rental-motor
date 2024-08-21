export const fetchFilteredHistoryData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered?filter=4_minggu`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();
        console.log('Filtered History Data:', responseData);

        return responseData.history;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
