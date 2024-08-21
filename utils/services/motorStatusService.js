export const fetchStatusMotorData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (responseData.listMotor && Array.isArray(responseData.listMotor)) {
            const { listMotor } = responseData;
            console.log('ListMotor Data:', listMotor);

            const available = listMotor.filter(motor => motor.status_motor === 'Tersedia');
            console.log('Available Motors:', available);

            const unavailable = listMotor.filter(motor => motor.status_motor !== 'Tersedia');
            console.log('Unavailable Motors:', unavailable);

            return {
                listMotor,
                available,
                unavailable
            };
        } else {
            console.error('ListMotor is not defined or not an array');
            return {
                listMotor: [],
                available: [],
                unavailable: []
            };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
