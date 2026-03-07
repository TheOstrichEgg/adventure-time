import type { TripDay, Category } from '../../types'
import EventCard from '../EventCard'

interface Props {
  day: TripDay
  categories?: Category[]
  dayIndex: number
  selectedCategories: Set<string>
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
}

export default function DaySection({ day, categories, dayIndex, selectedCategories }: Props) {
  const filteredEvents =
    selectedCategories.size === 0
      ? day.events
      : day.events.filter((e) => e.category && selectedCategories.has(e.category))

  if (filteredEvents.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex text-sm font-bold text-accent bg-accent/10 rounded-full px-3 py-1 tracking-widest uppercase">
          Day {dayIndex + 1}
        </span>
        <h2 className="text-base font-semibold text-text-hi">{day.title}</h2>
        <span className="text-sm text-text-muted ml-auto">{formatDate(day.date)}</span>
      </div>

      <div className="flex flex-col gap-2">
        {filteredEvents.map((event, i) => (
          <EventCard key={i} event={event} categories={categories} />
        ))}
      </div>
    </section>
  )
}
