// utils/service/historyService.js

export const updateHistorysStatus = async (id, status, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status_history: status,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update history status');
        }

        const data = await response.json();
        console.log('History status update:', data);
        return data; // Optionally return the response data if needed
    } catch (error) {
        console.error('Error updating history status:', error);
        throw error; // Optionally rethrow the error if you want to handle it further up
    }
};
