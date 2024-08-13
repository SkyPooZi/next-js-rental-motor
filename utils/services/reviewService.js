export const fetchReview = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const { review } = responseData;
        console.log('Review Data:', review);

        return review;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};
