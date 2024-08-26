import dayjs from 'dayjs';
import { fetchCancelledModal } from './fetchCancelledModal';

export const fetchBookedDates = async (motor_id, stok_motor, token, historyId) => {
    if (!motor_id) return [];
    try {
        // Fetch the specific booking details for the current user
        const userBooking = await fetchCancelledModal(token, historyId);

        // Ensure the userBooking exists and extract the start and end dates
        const excludeStartDate = userBooking && userBooking.history.tanggal_mulai ? dayjs(userBooking.history.tanggal_mulai) : null;
        const excludeEndDate = userBooking && userBooking.history.tanggal_selesai ? dayjs(userBooking.history.tanggal_selesai) : null;

        // Log the extracted dates
        console.log('Exclude Start Date:', excludeStartDate ? excludeStartDate.format('YYYY-MM-DD HH:mm:ss') : 'Not Available');
        console.log('Exclude End Date:', excludeEndDate ? excludeEndDate.format('YYYY-MM-DD HH:mm:ss') : 'Not Available');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        // Filter bookings by motor_id
        const bookingsForMotor = data.history.filter(item => {
            return item.motor_id === motor_id;
        });

        const bookingCountPerDay = {};

        bookingsForMotor.forEach(item => {
            const startDate = dayjs(item.tanggal_mulai);
            const endDate = dayjs(item.tanggal_selesai);

            for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'day'); date = date.add(1, 'day')) {
                const dateStr = date.format('YYYY-MM-DD');

                if (!bookingCountPerDay[dateStr]) {
                    bookingCountPerDay[dateStr] = 0;
                }
                bookingCountPerDay[dateStr]++;
            }
        });

        // Get all dates that are fully booked
        let disabledDates = Object.keys(bookingCountPerDay)
            .filter(dateStr => bookingCountPerDay[dateStr] >= stok_motor)
            .map(dateStr => dayjs(dateStr));

        // Exclude user's current booking dates if they match
        if (excludeStartDate && excludeEndDate) {
            // Generate a range of dates between excludeStartDate and excludeEndDate
            let excludedRange = [];
            for (let date = excludeStartDate; date.isBefore(excludeEndDate) || date.isSame(excludeEndDate, 'day'); date = date.add(1, 'day')) {
                excludedRange.push(date.format('YYYY-MM-DD'));
            }

            // Log the excluded range for debugging
            console.log('Excluded Range:', excludedRange);

            // Remove the user's booking dates from disabledDates
            disabledDates = disabledDates.filter(date =>
                !excludedRange.includes(date.format('YYYY-MM-DD'))
            );
        }

        console.log('Final Disabled Dates:', disabledDates);

        return disabledDates;
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return [];
    }
};
