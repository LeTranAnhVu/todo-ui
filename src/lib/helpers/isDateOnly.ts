import { DateOnly } from '@/lib/types/DateOnly.ts'
import { DATE_ONLY_FORMAT } from '@/lib/constants.ts'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export function isDateOnly(date: string): date is DateOnly {
    // https://day.js.org/docs/en/parse/is-valid
    dayjs.extend(customParseFormat)
    return dayjs(date, DATE_ONLY_FORMAT, true).isValid()
}