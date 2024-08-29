export const fetchHistoryDetail = async (id, token, setHistory, setError, setSelectedMotor) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/detail/${id}`, {
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
            console.log('Fetched data:', data.history);
            setHistory(data.history);
            setSelectedMotor(data.history.list_motor.nama_motor);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    }
};
