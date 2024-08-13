export const fetchMotor = async (token, setMotors, setError, setLoadData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 204) {
            setError('No content available');
        } else if (!response.ok) {
            setError(`Failed to fetch data: ${response.statusText}`);
        } else {
            const data = await response.json();
            console.log('Fetched motor:', data);
            setMotors(data.listMotor || []);
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    } finally {
        setLoadData(false);
    }
};
