// utils/formService/userService.js

export const fetchUserData = async ({ id, token }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 204) {
            throw new Error('No content available for the provided ID');
        } else if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data.user;
    } catch (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
};

export const updateUserData = async (userId, token, { nama_lengkap, nomor_hp }) => {
    try {
        const payload = {
            nama_lengkap: nama_lengkap,
            nomor_hp: nomor_hp,
        };

        console.log('Payload being sent to update user:', payload);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const updatedUser = await response.json();
        console.log('User data updated successfully:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};