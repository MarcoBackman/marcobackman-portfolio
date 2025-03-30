
export const calculateTotalYearMonth = (fromDate, toDate) => {

    let months = 0;


    let isCurrentJob = false;
    if (toDate === null || toDate === "") {
        isCurrentJob = true;
        toDate = new Date();
    } else {
        toDate = new Date(toDate); // Convert string to Date object
    }

    fromDate = new Date(fromDate);

    let years = 0;
    try {
        years = toDate?.getFullYear() - fromDate?.getFullYear();
    } catch (error) {
        console.error(error);
    }

    try {
        months = (toDate?.getMonth() - fromDate?.getMonth()) + 1;
    } catch (error) {
        console.error(error);
    }


    if (months < 0) {
        years--;
        months += 12;
    }

    return {isCurrentJob, years, months};
};

export const padToYYYY_MM_DD = (dateString) => {
    const trimmedDateString = typeof dateString === 'string' ? dateString.trim() : '';

    if (/^\d{4}-\d{2}$/.test(trimmedDateString)) {
        return `${trimmedDateString}-01`;
    }

    return trimmedDateString;
}

//Returns current date in YYYY-MM-DD form
export const getCurrentDateMonthDate = () => {
    const date = new Date();
    const year = date.getFullYear();        // Get current year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get current month (0-based, so add 1)
    const day = String(date.getDate()).padStart(2, '0');        // Get current day

    return `${year}-${month}-${day}`;
}

//Returns a total date, year
export const getTotalDateTimeYear = (filteredCareerData) => {
    let totalYears = 0;
    let remainingMonths = 0;

    // Merge overlapping dates
    const sortedListOfDates = filteredCareerData
        .map(dateSet => {
            // Create a new object to avoid mutating the original
            const paddedToDate = dateSet.paddedToDate === null || !dateSet.paddedToDate
                ? new Date()
                : dateSet.paddedToDate;

            // Always return a new object without modifying the original
            return { ...dateSet, paddedToDate };
        })
        .sort((a, b) => new Date(a.paddedFromDate) - new Date(b.paddedFromDate)); // Ensure proper sorting for dates

    // Merge overlapping dates
    const mergedDates = [];
    sortedListOfDates.forEach((date, index) => {
        if (index === 0) {
            mergedDates.push(date);
            return;
        }
        // Compare using Date objects
        if (new Date(date.paddedFromDate) <= new Date(mergedDates[mergedDates.length - 1].paddedToDate)) {
            const lastDate = mergedDates[mergedDates.length - 1];
            lastDate.paddedToDate = new Date(Math.max(new Date(lastDate.paddedToDate), new Date(date.paddedToDate)));
        } else {
            mergedDates.push(date);
        }
    });

    // Calculate total years and months
    mergedDates.forEach(date => {
        const { years, months } = calculateTotalYearMonth(date.paddedFromDate, date.paddedToDate);
        totalYears += years;
        remainingMonths += months;

        if (remainingMonths >= 12) {
            totalYears += Math.floor(remainingMonths / 12);
            remainingMonths %= 12;
        }
    });

    return { totalYears, remainingMonths };
}