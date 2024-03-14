
/// Check if the date as String is a valid Date
const isValidDate = (date) => {
    return !isNaN(new Date(date));
}

module.exports = {
    isValidDate
};