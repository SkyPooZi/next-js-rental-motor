export const fetchMotorDetails = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.status === 200) {
            return data.listMotor;
        } else {
            throw new Error('Failed to fetch motor details.');
        }
    } catch (error) {
        console.error('Error fetching motor data:', error);
        throw error;
    }
};

export const fetchMotorReviews = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/all`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.status === 200) {
            return data.review.filter(review => review.penilaian === 5);
        } else {
            console.error('Unexpected response status:', data.status);
            throw new Error('Failed to fetch reviews.');
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};