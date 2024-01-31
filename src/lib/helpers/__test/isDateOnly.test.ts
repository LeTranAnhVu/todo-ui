import { expect, test } from 'vitest'
import { DATE_ONLY_FORMAT } from '@/lib/constants.ts'
import { isDateOnly } from '@/lib/helpers/isDateOnly.ts'

test(`Return true when passing correct format ${DATE_ONLY_FORMAT}`, () => {
    const d = '2024-01-30'
    expect(isDateOnly(d)).toBe(true)
})

test(`Return false when passing incorrect format ${DATE_ONLY_FORMAT}`, () => {
    const d = 'random string'
    const d2 = '2023-11-18T11:55:20-05:00'
    const d3 = '2024.01.30'
    const d4 = '2024/01/30'
    expect(isDateOnly(d)).toBe(false)
    expect(isDateOnly(d2)).toBe(false)
    expect(isDateOnly(d3)).toBe(false)
    expect(isDateOnly(d4)).toBe(false)
})