import dayjs from 'dayjs';

export const fetchBookedDates = async (motor_id, token, stok_motor) => {
    console.log('motor_id:', motor_id);
    if (!motor_id) return { disabledDays: [], disabledTimesPerDay: {} };

    try {
        const responseHistory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!responseHistory.ok) {
            throw new Error('Failed to fetch booking history');
        }

        const dataHistory = await responseHistory.json();
        console.log('dataHistory:', dataHistory);

        const bookingsForMotor = dataHistory.history.filter(
            item => item.motor_id === motor_id && item.status_history === 'Dipesan'
        );
        console.log('bookingsForMotor:', bookingsForMotor);

        const disabledTimesPerDay = {};
        const bookingCounts = {};

        bookingsForMotor.forEach(item => {
            const startDate = dayjs(item.tanggal_mulai);
            const endDate = dayjs(item.tanggal_selesai);

            // Loop through each minute of the booking
            for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'minute'); date = date.add(1, 'minute')) {
                const dateStr = date.format('YYYY-MM-DD');
                const timeStr = date.format('HH:mm:ss'); // Only time part to track time slots within a day

                if (!bookingCounts[dateStr]) {
                    bookingCounts[dateStr] = {};
                }

                if (!bookingCounts[dateStr][timeStr]) {
                    bookingCounts[dateStr][timeStr] = 0;
                }

                // Increment booking count
                bookingCounts[dateStr][timeStr]++;

                console.log(`Booking count for ${timeStr} on ${dateStr}:`, bookingCounts[dateStr][timeStr]);

                // Disable only if booking count exceeds or equals stok_motor
                if (bookingCounts[dateStr][timeStr] >= stok_motor) {
                    if (!disabledTimesPerDay[dateStr]) {
                        disabledTimesPerDay[dateStr] = new Set();
                    }
                    disabledTimesPerDay[dateStr].add(timeStr); // Add the specific time slot as disabled
                    console.log(`Disabled time added for ${timeStr} on ${dateStr}`);
                }
            }
        });

        // Fetch additional unavailable dates from the motor endpoint
        const responseMotor = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!responseMotor.ok) {
            throw new Error('Failed to fetch motor list');
        }

        const dataMotor = await responseMotor.json();
        console.log('dataMotor:', dataMotor);

        const motorData = dataMotor.listMotor.find(motor => motor.id === motor_id);
        if (motorData) {
            const unavailableDates = [
                { start: dayjs(motorData.tanggal_mulai_tidak_tersedia), end: dayjs(motorData.tanggal_selesai_tidak_tersedia) }
            ];

            unavailableDates.forEach(({ start, end }) => {
                for (let date = start; date.isBefore(end) || date.isSame(end, 'minute'); date = date.add(1, 'minute')) {
                    const dateStr = date.format('YYYY-MM-DD');
                    const timeStr = date.format('HH:mm:ss');

                    if (!disabledTimesPerDay[dateStr]) {
                        disabledTimesPerDay[dateStr] = new Set();
                    }
                    disabledTimesPerDay[dateStr].add(timeStr);
                    console.log(`Unavailable date/time added for ${timeStr} on ${dateStr}`);
                }
            });
        } else {
            console.error('Motor data not found');
        }

        const disabledDays = Object.keys(disabledTimesPerDay).filter(dateStr => {
            // Check if all times of this day are disabled due to fully booked stok_motor
            const times = Array.from(disabledTimesPerDay[dateStr] || []);
            return times.length > 0 && times.length >= 24 * 60; // All 1440 minutes of the day are disabled
        });

        return { disabledDays, disabledTimesPerDay };
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};
