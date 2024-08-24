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

        // Create an object to store disabled dates and times
        const disabledDays = new Set();
        const disabledTimesPerDay = {};

        bookingsForMotor.forEach(item => {
            const startDate = dayjs(item.tanggal_mulai);
            const endDate = dayjs(item.tanggal_selesai);

            // Add the whole start day to disabledDays
            disabledDays.add(startDate.format('YYYY-MM-DD'));

            // If the end date is the same as the start date, disable the time range for that day
            if (startDate.isSame(endDate, 'day')) {
                for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'minute'); date = date.add(1, 'minute')) {
                    const dateStr = date.format('YYYY-MM-DD HH:mm:ss');

                    if (!disabledTimesPerDay[startDate.format('YYYY-MM-DD')]) {
                        disabledTimesPerDay[startDate.format('YYYY-MM-DD')] = new Set();
                    }
                    disabledTimesPerDay[startDate.format('YYYY-MM-DD')].add(dateStr);
                }
            } else {
                // Disable from start time to the end of the start day
                for (let date = startDate; date.isBefore(startDate.endOf('day')); date = date.add(1, 'minute')) {
                    const dateStr = date.format('YYYY-MM-DD HH:mm:ss');

                    if (!disabledTimesPerDay[startDate.format('YYYY-MM-DD')]) {
                        disabledTimesPerDay[startDate.format('YYYY-MM-DD')] = new Set();
                    }
                    disabledTimesPerDay[startDate.format('YYYY-MM-DD')].add(dateStr);
                }

                // Disable from start of the end day to the end time
                for (let date = endDate.startOf('day'); date.isBefore(endDate) || date.isSame(endDate, 'minute'); date = date.add(1, 'minute')) {
                    const dateStr = date.format('YYYY-MM-DD HH:mm:ss');

                    if (!disabledTimesPerDay[endDate.format('YYYY-MM-DD')]) {
                        disabledTimesPerDay[endDate.format('YYYY-MM-DD')] = new Set();
                    }
                    disabledTimesPerDay[endDate.format('YYYY-MM-DD')].add(dateStr);
                }
            }
        });

        return { disabledDays: Array.from(disabledDays), disabledTimesPerDay };
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};
