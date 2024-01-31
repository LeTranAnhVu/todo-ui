import { DateOnly } from '@/lib/types/DateOnly.ts'
import dayjs from 'dayjs'

export function isAfterDateOnly(day1: DateOnly | Date | string, day2: DateOnly | Date | string): boolean {
    return dayjs(day1).isAfter(dayjs(day2), 'day')
}