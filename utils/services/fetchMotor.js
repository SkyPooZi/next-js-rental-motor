export const fetchMotorData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const { listMotor } = responseData;
        console.log('listMotor Data:', listMotor);

        return {
            listMotor,
            totalMotor: listMotor.length
        };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
