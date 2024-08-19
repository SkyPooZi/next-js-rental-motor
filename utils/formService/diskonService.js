// utils/service/diskonService.js

export const fetchDiskons = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            return { error: 'No content available', data: [] };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}`, data: [] };
        } else {
            const data = await response.json();
            return { error: null, data: data.diskon || [] };
        }
    } catch (error) {
        return { error: `An error occurred: ${error.message}`, data: [] };
    }
};
