// utils/service/motorService.js

export const fetchDetailMotor = async (detailId, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${detailId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 204) {
            return { error: 'No content available', data: null };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}`, data: null };
        } else {
            const data = await response.json();
            return { error: null, data: data.listMotor };
        }
    } catch (err) {
        return { error: `An error occurred: ${err.message}`, data: null };
    }
};

export const fetchMotor = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 204) {
            return { error: 'No content available', data: [] };
        } else if (!response.ok) {
            return { error: `Failed to fetch data: ${response.statusText}`, data: [] };
        } else {
            const data = await response.json();
            return { error: null, data: data.listMotor || [] };
        }
    } catch (err) {
        return { error: `An error occurred: ${err.message}`, data: [] };
    }
};
