export const fetchUserDetails = async (id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
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
            console.log('Fetched data:', data); // Log the fetched data to check its structure
            return {
                data: data.user,
                imageUrl: `${process.env.NEXT_PUBLIC_API_URL}/storage/${data.user.gambar}`
            };
        }
    } catch (err) {
        return { error: `An error occurred: ${err.message}` };
    }
};
