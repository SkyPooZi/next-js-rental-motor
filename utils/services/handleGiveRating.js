import Cookies from 'js-cookie';

export const handleGiveRating = async (historyId, token, penilaian, komentar, file) => {
    try {
        const id = Cookies.get('id');
        const formData = new FormData();
        formData.append('gambar', file);
        formData.append('komentar', komentar);
        formData.append('penilaian', penilaian);
        formData.append('pengguna_id', id);

        // Create the review
        const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (reviewResponse.ok) {
            const reviewData = await reviewResponse.json();
            const ulasanId = reviewData.review.id; // Adjusted to get the review ID correctly

            // Update the history with the new ulasan_id
            const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${historyId}`, {
                method: 'POST', // Assuming this endpoint expects a POST request
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ulasan_id: ulasanId }),
            });

            if (historyResponse.ok) {
                const historyData = await historyResponse.json();
                return { success: true, data: { review: reviewData, history: historyData } };
            } else {
                const errorData = await historyResponse.json();
                console.error('Failed to update history:', errorData);
                return { success: false, error: errorData };
            }
        } else {
            const errorData = await reviewResponse.json();
            console.error('Failed to create review:', errorData);
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error in handleGiveRating:', error);
        return { success: false, error };
    }
};
