export const updateStatusOnServer = async (historyId, newStatus, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${historyId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status_history: newStatus }),
        });
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
    } catch (error) {
        console.error('Failed to update status on server:', error);
        throw error;
    }
};
