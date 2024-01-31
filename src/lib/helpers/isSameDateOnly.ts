import { DateOnly } from '@/lib/types/DateOnly.ts'
import dayjs from 'dayjs'

export function isSameDateOnly(day1: Date | DateOnly, day2: Date | DateOnly): boolean {
    return dayjs(day1).isSame(dayjs(day2), 'day')
}