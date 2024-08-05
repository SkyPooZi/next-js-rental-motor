export const fetchInvoice = async (orderId, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoice/detail/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching invoice data:', error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};
