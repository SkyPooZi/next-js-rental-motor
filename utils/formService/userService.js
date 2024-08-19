// utils/service/userService.js

export const fetchUserPoint = async (id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            return { error: 'No content available', data: null };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}`, data: null };
        } else {
            const data = await response.json();
            return { error: null, data: data.user.point };
        }
    } catch (error) {
        return { error: `An error occurred: ${error.message}`, data: null };
    }
};
