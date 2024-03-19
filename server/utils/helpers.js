
/// Check if the date as String is a valid Date
export const isValidDate = (date) => {
    return !isNaN(new Date(date));
}


export const sanitizeDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
