export const fetchDiscounts = async (token, setDiskons, setError, setLoadData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            setError('No content available');
        } else if (!response.ok) {
            setError(`Failed to fetch data: ${response.statusText}`);
        } else {
            const data = await response.json();
            console.log('Fetched diskons:', data);
            setDiskons(data.diskon || []);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setError(`An error occurred: ${error.message}`);
    } finally {
        setLoadData(false);
    }
};
