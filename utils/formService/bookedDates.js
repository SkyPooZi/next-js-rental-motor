import dayjs from 'dayjs';

export const fetchBookedDates = async (motor_id, token, stok_motor) => {
    console.log('motor_id:', motor_id);
    if (!motor_id) return { disabledDays: [], disabledTimesPerDay: {} };

    try {
        // Fetch booking history data
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

        // Filter bookings for the specific motorbike
        const bookingsForMotor = dataHistory.history.filter(
            item => item.motor_id === motor_id && item.status_history === 'Dipesan'
        );
        console.log('bookingsForMotor:', bookingsForMotor);

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

        // Fetch additional unavailable dates from the new endpoint
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

        // Filter the relevant motor entry based on motor_id
        const motorData = dataMotor.listMotor.find(motor => motor.id === motor_id);
        if (motorData) {
            // Extract unavailable date ranges
            const unavailableDates = [
                { start: dayjs(motorData.tanggal_mulai_tidak_tersedia), end: dayjs(motorData.tanggal_selesai_tidak_tersedia) }
            ];

            unavailableDates.forEach(({ start, end }) => {
                for (let date = start; date.isBefore(end) || date.isSame(end, 'minute'); date = date.add(1, 'minute')) {
                    const dateStr = date.format('YYYY-MM-DD');
                    const timeStr = date.format('YYYY-MM-DD HH:mm:ss');

                    // Automatically disable the day and the times
                    disabledDaysSet.add(dateStr);

                    if (!disabledTimesPerDay[dateStr]) {
                        disabledTimesPerDay[dateStr] = new Set();
                    }
                    disabledTimesPerDay[dateStr].add(timeStr);
                }
            });
        } else {
            console.error('Motor data not found');
        }

        // Convert sets to arrays for easier use later (if needed)
        const disabledDays = [...disabledDaysSet];

        return { disabledDays, disabledTimesPerDay };
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};
