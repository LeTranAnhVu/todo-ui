import { expect, test } from 'vitest'
import { isAfterDateOnly } from '@/lib/helpers/isAfterDateOnly.ts'
test('Return true when the first day is after the second day regardless time', () => {
    const d1 = '2024-02-01'
    const d2 = new Date(2024, 0, 31, 0,0,0)
    expect(isAfterDateOnly(d1, d2)).toBe(true)
})

test('Return false when the first day is equal the second day when comparing day regardless time', () => {
    const d1 = '2024-02-01'
    const d2 = new Date(2024, 1, 1, 20,0,0)
    expect(isAfterDateOnly(d2, d1)).toBe(false)
    expect(isAfterDateOnly(d1, d2)).toBe(false)
})

test('Return false when the first day is before the second day when comparing day regardless time', () => {
    const d1 = '2024-01-31'
    const d2 = new Date(2024, 1, 1, 0,0,0)
    expect(isAfterDateOnly(d1, d2)).toBe(false)
})