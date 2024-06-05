
function convertToSQLDatetime(date) {
    const time = '00:00:00'; // Assuming you want the time portion to be 00:00:00
    return `${date} ${time}`;
}


function getThisMonth() {
    const now = new Date();
    let start = new Date(now.getFullYear(), now.getMonth(), 2)
    start = start.toISOString().split('T')[0];

    let end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    end = end.toISOString().split('T')[0];
    return {start: start, end: end}
}


function convertToSQLDate(date) {
    const convDate = date.toISOString().split('T')[0];
    return convDate
}

export {
    convertToSQLDatetime,
    getThisMonth,
    convertToSQLDate
}