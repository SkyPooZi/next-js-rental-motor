// utils/service/bookingService.js

import dayjs from 'dayjs';

export const fetchBookedDates = async (motor_id, token, stok_motor) => {
    if (!motor_id) return [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch booking history');
        }

        const data = await response.json();

        // Filter bookings for the specific motorbike
        const bookingsForMotor = data.history.filter(item => item.motor_id === motor_id);

        // Create an object to count bookings per day
        const bookingCountPerDay = {};

        bookingsForMotor.forEach(item => {
            const startDate = dayjs(item.tanggal_mulai);
            const endDate = dayjs(item.tanggal_selesai);

            // Iterate over each day in the booking range
            for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'day'); date = date.add(1, 'day')) {
                const dateStr = date.format('YYYY-MM-DD');

                // Initialize count if not already present
                if (!bookingCountPerDay[dateStr]) {
                    bookingCountPerDay[dateStr] = 0;
                }
                bookingCountPerDay[dateStr]++;
            }
        });

        // Determine which dates to disable based on stock availability
        const disabledDates = Object.keys(bookingCountPerDay)
            .filter(dateStr => bookingCountPerDay[dateStr] >= stok_motor)
            .map(dateStr => dayjs(dateStr));

        console.log('Disabled Dates:', disabledDates);

        return disabledDates;
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};
