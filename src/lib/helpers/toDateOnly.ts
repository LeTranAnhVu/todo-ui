import { DateOnly } from '@/lib/types/DateOnly.ts'
import dayjs from 'dayjs'
import { DATE_ONLY_FORMAT } from '@/lib/constants.ts'
import { isDateOnly } from '@/lib/helpers/isDateOnly.ts'

export function toDateOnly(day: Date | string): DateOnly {
    const formattedDate = dayjs(day).format(DATE_ONLY_FORMAT)
    if (!isDateOnly(formattedDate)) {
        throw Error('invalid date.')
    }

    return formattedDate
}