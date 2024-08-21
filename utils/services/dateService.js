export const calculateDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt.split('T')[0]); // Extract the date portion
    const today = new Date();
    const timeDifference = today - createdDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 'Hari ini';
    if (daysAgo === 1) return '1 hari yang lalu';
    return `${daysAgo} hari yang lalu`;
};