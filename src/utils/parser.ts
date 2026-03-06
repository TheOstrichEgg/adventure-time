import type { TripData, TripMeta, TripDay, TripEvent, Category } from '../types'

function assertString(val: unknown, field: string): string {
  if (typeof val !== 'string') throw new Error(`${field}은(는) string이어야 합니다`)
  return val
}

function parseEvent(raw: unknown, idx: number): TripEvent {
  if (typeof raw !== 'object' || raw === null)
    throw new Error(`events[${idx}]은(는) object이어야 합니다`)
  const obj = raw as Record<string, unknown>
  return {
    title: assertString(obj.title, `events[${idx}].title`),
    time: assertString(obj.time, `events[${idx}].time`),
    ...(obj.time_end !== undefined && { time_end: assertString(obj.time_end, `events[${idx}].time_end`) }),
    ...(obj.category !== undefined && { category: assertString(obj.category, `events[${idx}].category`) }),
    ...(obj.memo !== undefined && { memo: assertString(obj.memo, `events[${idx}].memo`) }),
    ...(obj.link !== undefined && { link: assertString(obj.link, `events[${idx}].link`) }),
    ...(obj.image !== undefined && { image: assertString(obj.image, `events[${idx}].image`) }),
    ...(obj.required !== undefined && { required: Boolean(obj.required) }),
  }
}

function parseDay(raw: unknown, idx: number): TripDay {
  if (typeof raw !== 'object' || raw === null)
    throw new Error(`days[${idx}]은(는) object이어야 합니다`)
  const obj = raw as Record<string, unknown>
  return {
    title: assertString(obj.title, `days[${idx}].title`),
    date: assertString(obj.date, `days[${idx}].date`),
    ...(obj.timezone !== undefined && { timezone: assertString(obj.timezone, `days[${idx}].timezone`) }),
    ...(obj.locations !== undefined && Array.isArray(obj.locations) && {
      locations: obj.locations.map((l, i) => assertString(l, `days[${idx}].locations[${i}]`)),
    }),
    events: Array.isArray(obj.events) ? obj.events.map((e, i) => parseEvent(e, i)) : [],
  }
}

function parseMeta(raw: unknown): TripMeta {
  if (typeof raw !== 'object' || raw === null)
    throw new Error('meta는 object이어야 합니다')
  const obj = raw as Record<string, unknown>
  return {
    id: assertString(obj.id, 'meta.id'),
    title: assertString(obj.title, 'meta.title'),
    ...(obj.memo !== undefined && { memo: assertString(obj.memo, 'meta.memo') }),
    ...(obj.cover_image !== undefined && { cover_image: assertString(obj.cover_image, 'meta.cover_image') }),
  }
}

function parseCategory(raw: unknown, idx: number): Category {
  if (typeof raw !== 'object' || raw === null)
    throw new Error(`categories[${idx}]은(는) object이어야 합니다`)
  const obj = raw as Record<string, unknown>
  return {
    id: assertString(obj.id, `categories[${idx}].id`),
    label: assertString(obj.label, `categories[${idx}].label`),
    color: assertString(obj.color, `categories[${idx}].color`),
    ...(obj.emoji !== undefined && { emoji: assertString(obj.emoji, `categories[${idx}].emoji`) }),
  }
}

export function parseTripData(raw: unknown): TripData {
  if (typeof raw !== 'object' || raw === null)
    throw new Error('여행 데이터는 object이어야 합니다')
  const obj = raw as Record<string, unknown>
  return {
    meta: parseMeta(obj.meta),
    ...(Array.isArray(obj.categories) && {
      categories: obj.categories.map((c, i) => parseCategory(c, i)),
    }),
    days: Array.isArray(obj.days) ? obj.days.map((d, i) => parseDay(d, i)) : [],
  }
}
