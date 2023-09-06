function convertDateToHms(milliseconds) {
    if (milliseconds >= 3600000) {
        return `${new Date(milliseconds).getHours()} h ${new Date(
            milliseconds
        ).getMinutes()} m ${new Date(milliseconds).getSeconds()} s`;
    } else if (milliseconds >= 60000) {
        return `${new Date(milliseconds).getMinutes()} m ${new Date(
            milliseconds
        ).getSeconds()} s`;
    } else if (milliseconds >= 1000) {
        return `${new Date(milliseconds).getSeconds()} s`;
    } else return milliseconds + ' ms';
}

export { convertDateToHms };