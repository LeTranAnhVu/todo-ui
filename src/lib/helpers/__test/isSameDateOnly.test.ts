import { expect, test } from 'vitest'
import { isSameDateOnly } from '@/lib/helpers/isSameDateOnly.ts'
test('Return true when it is same date without caring about time', () => {
    const d1 = '2024-01-31'
    const d2 = new Date(2024, 0, 31, 4,30,0)
    const d3 = new Date(2024, 0, 31, 20,30,0)
    expect(isSameDateOnly(d1, d2)).toBe(true)
    expect(isSameDateOnly(d3, d2)).toBe(true)
})

test('Return false when it is not same date without caring about time', () => {
    const d1 = '2024-01-30'
    const d2 = new Date(2024, 0, 31, 4,30,0)
    const d3 = new Date(2024, 1, 1, 20,30,0)
    expect(isSameDateOnly(d1, d2)).toBe(false)
    expect(isSameDateOnly(d3, d2)).toBe(false)
})