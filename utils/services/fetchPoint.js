export const fetchPoint = async (id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            throw new Error('No content available');
        } else if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        } else {
            const data = await response.json();
            return { point: data.user.point, referalCode: data.user.kode };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};