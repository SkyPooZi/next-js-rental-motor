export const fetchReviewData = async ({ id, token }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            throw new Error('No content available for the provided ID');
        } else if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data.review;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};
