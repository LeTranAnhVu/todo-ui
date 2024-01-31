import { expect, test } from 'vitest'
import { DATE_ONLY_FORMAT } from '@/lib/constants.ts'
import { toDateOnly } from '@/lib/helpers/toDateOnly.ts'

test(`Return correct format ${DATE_ONLY_FORMAT}`, () => {
    const d = new Date(2024, 0, 31, 0, 0, 0)
    const d2 = new Date(2024, 0, 31, 23, 59, 0)
    const d3 = '2024.01.30'
    expect(toDateOnly(d)).toBe('2024-01-31')
    expect(toDateOnly(d2)).toBe('2024-01-31')
    expect(toDateOnly(d3)).toBe('2024-01-30')
})