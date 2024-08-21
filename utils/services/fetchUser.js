export const fetchUser = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const { user } = responseData;
        console.log('User Data:', user);

        return user;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
