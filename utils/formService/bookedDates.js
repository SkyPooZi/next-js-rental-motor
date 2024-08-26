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
        const disabledTimesPerDay = {};
        const bookingCounts = {}; // Object to track booking counts
        const disabledDaysSet = new Set(); // To track which days are fully or partially booked

        bookingsForMotor.forEach(item => {
            const startDate = dayjs(item.tanggal_mulai);
            const endDate = dayjs(item.tanggal_selesai);

            // Automatically disable the start date
            const startDateStr = startDate.format('YYYY-MM-DD');
            disabledDaysSet.add(startDateStr);

            for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'minute'); date = date.add(1, 'minute')) {
                const dateStr = date.format('YYYY-MM-DD');
                const timeStr = date.format('YYYY-MM-DD HH:mm:ss');

                if (!bookingCounts[dateStr]) {
                    bookingCounts[dateStr] = {};
                }

                if (!bookingCounts[dateStr][timeStr]) {
                    bookingCounts[dateStr][timeStr] = 0;
                }

                bookingCounts[dateStr][timeStr]++;

                // Only disable the time if the booking count reaches or exceeds the stock
                if (bookingCounts[dateStr][timeStr] >= stok_motor) {
                    if (!disabledTimesPerDay[dateStr]) {
                        disabledTimesPerDay[dateStr] = new Set();
                    }
                    disabledTimesPerDay[dateStr].add(timeStr);
                }
            }
        });

        // Convert sets to arrays for easier use later (if needed)
        const disabledDays = [...disabledDaysSet, ...Object.keys(disabledTimesPerDay).filter(dateStr => {
            // Check if every minute of the day is fully booked
            let totalBookedMinutes = 0;

            // Check each minute of the day to see if it is fully booked
            for (let hour = 0; hour < 24; hour++) {
                for (let minute = 0; minute < 60; minute++) {
                    const timeStr = `${dateStr} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
                    if (bookingCounts[dateStr][timeStr] && bookingCounts[dateStr][timeStr] >= stok_motor) {
                        totalBookedMinutes++;
                    }
                }
            }

            return totalBookedMinutes >= 24 * 60; // All minutes are booked for that day
        })];

        // Remove duplicates if any
        const uniqueDisabledDays = [...new Set(disabledDays)];

        return { disabledDays: uniqueDisabledDays, disabledTimesPerDay };
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};
