import type { TripDay, Category } from '../../types'
import EventCard from '../EventCard'

interface Props {
  day: TripDay
  categories?: Category[]
  dayIndex: number
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
}

export default function DaySection({ day, categories, dayIndex }: Props) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
          Day {dayIndex + 1}
        </span>
        <h2 className="text-base font-semibold text-gray-800">{day.title}</h2>
        <span className="text-xs text-gray-400 ml-auto">{formatDate(day.date)}</span>
      </div>

      <div className="relative">
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-gray-100" />
        <div className="flex flex-col gap-2">
          {day.events.map((event, i) => (
            <EventCard key={i} event={event} categories={categories} />
          ))}
        </div>
      </div>
    </section>
  )
}
