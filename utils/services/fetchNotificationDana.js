export const fetchNotificationDana = async (token, id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification-dana/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            return { error: 'No content available for the provided ID' };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}` };
        } else {
            const data = await response.json();
            console.log('Fetched data:', data);
            return data;
        }
    } catch (err) {
        return { error: `An error occurred: ${err.message}` };
    }
};
