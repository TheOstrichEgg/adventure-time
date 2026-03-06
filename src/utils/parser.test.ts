import { describe, it, expect } from 'vitest'
import { parseTripData } from './parser'

describe('parseTripData', () => {
  const validTrip = {
    meta: { id: 'tokyo-2025', title: '도쿄 여행' },
    days: [
      {
        title: '1일차',
        date: '2025-04-01',
        events: [
          { title: '공항 출발', time: '09:00' },
          { title: '호텔 체크인', time: '15:00', time_end: '16:00', required: true },
        ],
      },
    ],
  }

  it('parses valid trip data', () => {
    const result = parseTripData(validTrip)
    expect(result.meta.id).toBe('tokyo-2025')
    expect(result.meta.title).toBe('도쿄 여행')
    expect(result.days).toHaveLength(1)
    expect(result.days[0].events).toHaveLength(2)
  })

  it('parses categories', () => {
    const withCategories = {
      ...validTrip,
      categories: [{ id: 'food', label: '식사', color: '#f97316', emoji: '🍜' }],
    }
    const result = parseTripData(withCategories)
    expect(result.categories).toHaveLength(1)
    expect(result.categories![0].id).toBe('food')
  })

  it('handles missing optional fields gracefully', () => {
    const result = parseTripData(validTrip)
    expect(result.meta.memo).toBeUndefined()
    expect(result.categories).toBeUndefined()
    expect(result.days[0].timezone).toBeUndefined()
  })

  it('parses required field as boolean', () => {
    const result = parseTripData(validTrip)
    expect(result.days[0].events[1].required).toBe(true)
  })

  it('throws when meta is missing', () => {
    expect(() => parseTripData({ days: [] })).toThrow()
  })

  it('throws when meta.id is missing', () => {
    expect(() => parseTripData({ meta: { title: '제목만' }, days: [] })).toThrow()
  })

  it('throws when input is not an object', () => {
    expect(() => parseTripData(null)).toThrow()
    expect(() => parseTripData('string')).toThrow()
  })
})
