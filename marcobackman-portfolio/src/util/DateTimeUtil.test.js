
jest.mock('./DateTimeUtil', () => ({
    ...jest.requireActual('./DateTimeUtil'), // To retain other actual imports like getTotalDateTimeYear
    calculateTotalYearMonth: jest.fn(),
}));

import {calculateTotalYearMonth, getTotalDateTimeYear} from "./DateTimeUtil";

describe("getTotalDateTimeYear test", () => {
    beforeEach(() => {
        // Reset the mock before each test.
        jest.clearAllMocks();
    });


    test("should return 0 if listOfDates is empty", () => {
        const totalMonthsYears = getTotalDateTimeYear([]);
        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 0, "totalYears": 0});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })

    test("should return 5 if a single date has 5 months", () => {
        let firstDate = {
            fromDate: "2021-01-01",
            toDate: "2021-05-01",
        }

        const totalMonthsYears = getTotalDateTimeYear([firstDate]);


        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 5, "totalYears": 0});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })

    test("should return 1 year and 5 months if a single date has 17 months", () => {
        let firstDate = {
            fromDate: "2021-01-01",
            toDate: "2022-05-01",
        }

        const totalMonthsYears = getTotalDateTimeYear([firstDate]);


        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 5, "totalYears": 1});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })

    test("should return 1 year and 5 months if two dates has 17 months in total", () => {
        let firstDate = {
            fromDate: "2021-01-01",
            toDate: "2021-05-01",
        }

        let secondDate = {
            fromDate: "2021-05-01",
            toDate: "2022-05-01",
        }

        const totalMonthsYears = getTotalDateTimeYear([firstDate, secondDate]);


        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 5, "totalYears": 1});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })

    test("Merge overlapping date test", () => {
        let firstDate = {
            fromDate: "2021-06-01",
            toDate: "2021-07-01",
        }

        let secondDate = {
            fromDate: "2021-05-01",
            toDate: "2022-05-01",
        }

        let thirdDate = {
            fromDate: "2021-01-01",
            toDate: "2022-05-01",
        }

        const totalMonthsYears = getTotalDateTimeYear([firstDate, secondDate, thirdDate]);


        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 0, "totalYears": 1});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })

    test("Gapped dates", () => {
        let firstDate = {
            fromDate: "2021-06-01",
            toDate: "2021-07-01",
        }

        let secondDate = {
            fromDate: "2022-05-01",
            toDate: "2022-05-31",
        }

        const totalMonthsYears = getTotalDateTimeYear([firstDate, secondDate]);


        expect(totalMonthsYears).toStrictEqual({"remainingMonths": 3, "totalYears": 0});

        expect(calculateTotalYearMonth).not.toHaveBeenCalled();
    })
});