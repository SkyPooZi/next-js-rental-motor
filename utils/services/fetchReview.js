export const fetchReview = async (token, ulasanId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/detail/${ulasanId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch Review:', error);
        throw error;
    }
};