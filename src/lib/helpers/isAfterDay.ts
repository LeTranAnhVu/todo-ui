export function isAfterDay(day1: Date, day2: Date): number {
    let sum = 0

    if (day1.getFullYear() > day2.getFullYear()) {
        sum += 100
    } else if (day1.getFullYear() < day2.getFullYear()) {
        sum -= 100
    } else {
        sum = 0
    }

    if (day1.getMonth() > day2.getMonth()) {
        sum += 10
    } else if (day1.getMonth() < day2.getMonth()) {
        sum -= 10
    } else {
        sum = 0
    }

    if (day1.getDate() > day2.getDate()) {
        sum += 1
    } else if (day1.getDate() < day2.getDate()) {
        sum -= 1
    } else {
        sum = 0
    }

    return sum
}